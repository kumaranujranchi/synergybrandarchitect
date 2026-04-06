import fs from 'fs';
async function run() {
  const res = await fetch("https://i.imgur.com/8j3VafC.png");
  if (!res.ok) throw new Error("Failed " + res.status);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync("client/public/images/synergy-logo.png", Buffer.from(buffer));
  console.log("Done. Bytes: " + buffer.byteLength);
}
run();
