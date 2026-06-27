import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Simple in-process write queue per file to avoid concurrent writes
// clobbering each other. This is sufficient for a single Node.js
// process (e.g. one PM2/Docker instance). If you later scale to
// multiple instances, swap this module for a real database -
// every function below keeps the same call signature on purpose.
const queues = new Map();

function withLock(key, fn) {
  const prev = queues.get(key) || Promise.resolve();
  const next = prev.then(fn, fn);
  queues.set(
    key,
    next.catch(() => {})
  );
  return next;
}

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJson(name, fallback) {
  try {
    const raw = fs.readFileSync(filePath(name), "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

function writeJson(name, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmpPath = filePath(name) + ".tmp";
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
  fs.renameSync(tmpPath, filePath(name));
}

/**
 * Read the full contents of a named collection (e.g. "orders").
 */
export function readCollection(name, fallback = []) {
  const data = readJson(name, { [name]: fallback });
  return data[name] || fallback;
}

/**
 * Atomically update a named collection via a mutator function that
 * receives the current array and returns the new array.
 */
export async function updateCollection(name, mutator) {
  return withLock(name, () => {
    const current = readCollection(name, []);
    const next = mutator(current);
    writeJson(name, { [name]: next });
    return next;
  });
}
