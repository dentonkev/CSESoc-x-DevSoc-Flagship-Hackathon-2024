import convert from 'heic-convert';
import {promises as fs } from 'fs'

export function convertToObj(str) {
  if (str === "None") {
    //TODO
  }

  const map = {};
  const lines = str.trim().split('\n');
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    map[key] = value;
  });
  return map;
}

export const change = async (path) => {
  const inputBuffer = await fs.readFile(path);
  const outputBuffer = await convert({
    buffer: inputBuffer, 
    format: 'PNG'      
  });

  await fs.writeFile("./images/h.png", outputBuffer);
  return "./images/h.png"
};