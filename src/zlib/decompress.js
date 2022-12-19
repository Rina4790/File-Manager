import { chdir } from "node:process";
import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import * as fs from "node:fs";
import { pipeline } from "node:stream";
import { err, pathResolve } from "../config.js";

export const decompress = async (homedir, pathFile, pathDecompress) => {
  return await new Promise((resolve, reject) => {
    chdir(homedir);
    const pathFileRes = pathResolve(pathFile);
    const pathDecompressRes = pathResolve(pathDecompress);
    fs.access(pathFileRes, fs.F_OK, (error) => {
      if (error) {
        resolve(err());
        return;
      }
      pipeline(
        createReadStream(pathFileRes),
        createBrotliDecompress(),
        createWriteStream(pathDecompressRes),
        (error) => {
          if (error) {
            resolve(err());
          } else {
            resolve(console.log("File has been decompressed!"));
          }
        }
      );
    });
  });
};
