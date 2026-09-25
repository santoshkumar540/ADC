import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const outPath = path.resolve(process.cwd(), 'data/live_url.txt');
fs.writeFileSync(outPath, 'Connecting to Serveo live tunnel...\n');

const child = spawn('ssh', [
  '-o', 'StrictHostKeyChecking=no',
  '-R', '80:localhost:3000',
  'serveo.net'
], { stdio: ['ignore', 'pipe', 'pipe'] });

child.stdout.on('data', (data) => {
  const text = data.toString();
  console.log(text);
  fs.appendFileSync(outPath, text);
});

child.stderr.on('data', (data) => {
  const text = data.toString();
  console.error(text);
  fs.appendFileSync(outPath, text);
});

child.on('close', (code) => {
  console.log('Tunnel exited with code', code);
  fs.appendFileSync(outPath, `\nTunnel exited with code ${code}\n`);
});
