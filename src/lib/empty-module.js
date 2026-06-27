// Intentionally empty. Used by next.config.mjs to stub out the
// optional `canvas` dependency that pdfjs-dist (via react-pdf) tries
// to import for Node.js environments — we only ever render PDFs in
// the browser, so this import should never actually be reached.
module.exports = {};
