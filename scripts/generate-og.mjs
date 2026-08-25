import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = dirname(dirname(fileURLToPath(import.meta.url)));
const origen = join(raiz, 'src', 'assets', 'og.svg');
const destino = join(raiz, 'public', 'og.png');

await sharp(origen, { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(destino);

console.log('og.png generado en:', destino);
