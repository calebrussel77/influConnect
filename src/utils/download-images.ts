/* eslint-disable @typescript-eslint/no-misused-promises */
import { createWriteStream, readFileSync } from 'fs';
import { get } from 'https';
import { createInterface } from 'readline';

// Fonction principale async
async function main() {
  // Lire toutes les entrées de STDIN
  const rl = createInterface({
    input: process.stdin,
  });

  let input = '';
  rl.on('line', (line: string) => {
    input += line + '\n';
  });

  rl.on('close', async () => {
    const downloads: Record<string, string> = {};

    // Trouver toutes les balises <img> et les corriger
    input = input.replace(/<img\s+(.*?)\/>/gms, (val: string) => {
      if (val.includes('src=')) {
        const url = val.match(/src="(.*?)"/)?.[1];
        const id = url?.match('TEMP/([^?]*)')?.[1];
        if (url && id) {
          val = val.replace(`src="${url}"`, `src="/${id}.unk"`);
          downloads[url] = id;
        }
      }
      if (val.includes('srcSet=')) {
        const values = val.match(/srcSet="(.*?)"/)?.[1];
        const urls = values?.split(',') ?? [];
        let url = urls[0]?.split(' ')[0];
        url = url?.replace(/&width=(.*?)/, '');
        const id = url?.match('TEMP/([^?]*)')?.[1];
        if (url && id) {
          val = val.replace(`srcSet="${values}"`, `src="/${id}.unk"`);

          const sizes = urls.map(url => url?.trim()?.split(' ')?.[1]) || [];
          val = val.replace(
            /<img/,
            `<img sizes="${sizes.filter(v => v).join(', ')}"`
          );
          downloads[url] = id;
        }
      }
      if (!val.includes('alt=')) {
        val = val.replace(
          /<img/,
          '<img alt="Replace with an informative alt text"'
        );
      }
      val = val.replace(/<img/, '<Image');
      return val;
    });

    await Promise.all(
      Object.keys(downloads).map(async url => {
        await new Promise<void>(resolve => {
          get(url, async response => {
            // Déterminer le type d'image
            let ext = 'png';
            const type = response.headers['content-type'];
            if (type?.includes('svg')) {
              ext = 'svg';
            } else if (type?.includes('jpeg') ?? type?.includes('jpg')) {
              ext = 'jpg';
            }

            // Télécharger le fichier dans /public
            await new Promise<void>(frs => {
              const file = createWriteStream(
                `./public/${downloads[url]}.${ext}`
              );
              response.pipe(file);
              file.on('finish', () => {
                file.close();
                frs();
              });
            });

            // Remplacer l'URL src par une nouvelle URL avec la bonne extension
            input = input.replace(
              `"/${downloads[url]}.unk"`,
              `"/${downloads[url]}.${ext}"`
            );

            // Déterminer la taille de l'image
            let width = 1000;
            let height = 1000;
            if (ext === 'svg') {
              const svgCode = readFileSync(
                `./public/${downloads[url]}.svg`,
                'utf-8'
              );
              width = parseInt(svgCode.match(/width="(.*?)"/)?.[1] ?? '1000');
              height = parseInt(svgCode.match(/height="(.*?)"/)?.[1] ?? '1000');
            }

            // Ajouter la hauteur et la largeur car le composant Image les nécessite
            input = input.replace(
              `"/${downloads[url]}.${ext}"`,
              `"/${downloads[url]}.${ext}" width={${width}} height={${height}}`
            );

            resolve();
          });
        });
      })
    );

    // Afficher le code ajusté
    console.log(input);
  });
}

void main();
