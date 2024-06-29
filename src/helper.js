import convert from 'heic-convert';
import {promises as fs } from 'fs'

export function convertToObj(str) {
  if (str === "None") {
    
  }

  const map = {};
  const lines = str.trim().split('\n');
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    map[key] = value;
  });
  return map;
}

// export const change = async (path) => {
//   let fileType = path.slice(-3)
//   let fileTypes = ["png", "PNG", "jpg", "JPG", "gif", "GIF"]
//   if (fileTypes.includes(fileType)) return path;

//   fileType = path.slice(-4)
//   fileTypes = ["jpeg", "JPEG"]
//   if (fileTypes.includes(fileType)) return path;

//   const inputBuffer = await fs.readFile(path);
//   const outputBuffer = await convert({
//     buffer: inputBuffer, 
//     format: 'JPEG',
//     quality: 1      
//   });

//   let opath= path.split('/')
//   // console.log(opath)
//   let filename = opath[opath.length - 1]
//   // console.log("1:" + filename)
//   let array = filename.split(".")
//   let newPath = `./images/${array[0]}.jpeg`
//   // console.log(newPath)
//   await fs.writeFile(newPath, outputBuffer);
//   return newPath
// };