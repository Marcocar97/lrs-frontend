import sharp from "sharp";
import fs from "fs/promises";

const inputDir = "./public";
const outputDir = "./public/pdf-assets";

await fs.mkdir(outputDir, { recursive: true });

const jobs = [
  // Portada y contraportada:
  {
    input: "1F.png",
    output: "1F.jpg",
    width: 1600,
    type: "jpeg",
    quality: 84,
  },
  {
    input: "2F.png",
    output: "2F.jpg",
    width: 1600,
    type: "jpeg",
    quality: 84,
  },

  // Logos con transparencia:
  {
    input: "1lrs.png",
    output: "1lrs.png",
    width: 500,
    type: "png",
  },

  // Logo FastCoat:
  {
    input: "fasttop1.jpg",
    output: "fasttop1.jpg",
    width: 800,
    type: "jpeg",
    quality: 88,
  },

  // Firmas:
  {
    input: "firma.png",
    output: "firma.png",
    width: 500,
    type: "png",
  },
  {
    input: "firmat.png",
    output: "firmat.png",
    width: 500,
    type: "png",
  },
];

for (const job of jobs) {
  let pipeline = sharp(`${inputDir}/${job.input}`)
    .rotate()
    .resize({
      width: job.width,
      withoutEnlargement: true,
    });

  if (job.type === "jpeg") {
    pipeline = pipeline.jpeg({
      quality: job.quality,
      mozjpeg: true,
    });
  } else {
    pipeline = pipeline.png({
      compressionLevel: 9,
      palette: true,
    });
  }

  await pipeline.toFile(`${outputDir}/${job.output}`);

  console.log(`Optimised: ${job.input} -> ${job.output}`);
}

console.log("PDF assets optimised.");