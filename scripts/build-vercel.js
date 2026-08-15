'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of ['index.html', 'manifest.webmanifest', 'sw.js']) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

for (const dir of ['src', 'styles']) {
  fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
}

console.log('Built public/ for Vercel');
