/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // pdfjs-dist (used by react-pdf) optionally imports `canvas` for
      // Node.js environments; we only render PDFs in the browser, so
      // tell the bundler to leave that import alone.
      canvas: { browser: "./src/lib/empty-module.js" },
    },
  },
};

export default nextConfig;
