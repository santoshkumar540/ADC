import { startTunnel } from 'untun';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  console.log('Initiating Cloudflare Tunnel via untun...');
  const tunnel = await startTunnel({ port: 3000 });
  const url = await tunnel.getURL();
  console.log('========================================');
  console.log('PUBLIC CLOUDFLARE LIVE URL:', url);
  console.log('========================================');
  
  const outPath = path.resolve(process.cwd(), 'data/live_url.txt');
  fs.writeFileSync(outPath, `PUBLIC_LIVE_URL=${url}\nUPDATED_AT=${new Date().toISOString()}\n`);
}

main().catch((err) => {
  console.error('Fatal tunnel error:', err);
  const outPath = path.resolve(process.cwd(), 'data/live_url.txt');
  fs.writeFileSync(outPath, `TUNNEL_ERROR: ${err?.message || err}\n`);
});
