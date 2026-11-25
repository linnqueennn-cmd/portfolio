// Local Windows preview only; not included in the public Pages export.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {spawn, spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const state = path.join(root, '.portrait-processing', 'preview-state.json');
fs.mkdirSync(path.dirname(state), {recursive: true});
function available() {
  return new Promise(resolve => {
    const request = http.get('http://127.0.0.1:4176/portfolio/', response => {
      response.resume(); resolve(response.statusCode === 200);
    });
    request.setTimeout(1500, () => request.destroy());
    request.on('error', () => resolve(false));
  });
}
async function start() {
  // A second login/manual launch must not create a second server.
  if (await available()) return;
  if (!fs.existsSync(path.join(root, 'dist', 'index.html'))) {
    const build = spawnSync(process.execPath, [path.join(__dirname, 'prepare-pages.cjs')], {cwd: root, windowsHide: true});
    if (build.status !== 0) return;
  }
  const server = spawn(process.execPath, [path.join(__dirname, 'preview-pages.cjs'), '4176'], {
    cwd: root, windowsHide: true, stdio: 'ignore'
  });
  fs.writeFileSync(state, JSON.stringify({watchdog: process.pid, server: server.pid, port: 4176}));
  let scheduled = false;
  const retry = () => { if (!scheduled) { scheduled = true; setTimeout(start, 2500); } };
  server.once('exit', retry);
  server.once('error', retry);
}
start();
