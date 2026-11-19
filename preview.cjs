const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.argv[2] || 4174);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.pdf': 'application/pdf',
  '.ttf': 'font/ttf', '.webm': 'video/webm', '.mp4': 'video/mp4', '.glb': 'model/gltf-binary',
  '.hdr': 'application/octet-stream'
};

http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = path.resolve(__dirname, pathname === '/' ? 'index.html' : '.' + pathname);
  const type = types[path.extname(file)];
  if (!file.startsWith(__dirname + path.sep) || !type) return response.writeHead(404).end();
  fs.readFile(file, (error, bytes) => {
    if (error) return response.writeHead(404).end();
    const headers = {'Content-Type': type, 'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes'};
    const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range || '');
    if (range) {
      const start = Number(range[1]);
      const end = Math.min(range[2] ? Number(range[2]) : bytes.length - 1, bytes.length - 1);
      if (start > end) return response.writeHead(416, {'Content-Range': 'bytes */' + bytes.length}).end();
      response.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${bytes.length}`, 'Content-Length': end - start + 1});
      return response.end(bytes.subarray(start, end + 1));
    }
    response.writeHead(200, {...headers, 'Content-Length': bytes.length});
    response.end(bytes);
  });
}).listen(port, '127.0.0.1', () => console.log('http://127.0.0.1:' + port + '/'));
