// Preview the exact publishing directory beneath the GitHub project URL prefix.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const port = Number(process.argv[2] || 4175);
const types = {'.html': 'text/html; charset=utf-8', '.css': 'text/css',
  '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.gif': 'image/gif', '.pdf': 'application/pdf',
  '.ttf': 'font/ttf', '.webm': 'video/webm', '.glb': 'model/gltf-binary',
  '.hdr': 'application/octet-stream', '.txt': 'text/plain'};
http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/portfolio') return response.writeHead(301, {Location: '/portfolio/'}).end();
  if (!pathname.startsWith('/portfolio/')) return response.writeHead(404).end();
  const relative = decodeURIComponent(pathname.slice('/portfolio/'.length)) || 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) return response.writeHead(404).end();
  fs.readFile(file, (error, bytes) => {
    if (error) return response.writeHead(404).end();
    const headers = {'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes'};
    const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range || '');
    if (range) {
      const start = Number(range[1]);
      const end = Math.min(range[2] ? Number(range[2]) : bytes.length - 1, bytes.length - 1);
      if (start > end) return response.writeHead(416).end();
      return response.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${bytes.length}`,
        'Content-Length': end - start + 1}).end(bytes.subarray(start, end + 1));
    }
    response.writeHead(200, {...headers, 'Content-Length': bytes.length}).end(bytes);
  });
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/portfolio/`));
