import { chdir } from "node:process";
import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import * as fs from "node:fs";
import { pipeline } from "node:stream";
import { err, pathResolve } from "../config.js";

export const compress = async (homedir, pathFile, pathCompress) => {
  return await new Promise((resolve, reject) => {
    chdir(homedir);
    const pathFileRes = pathResolve(pathFile);
    const pathCompressRes = pathResolve(pathCompress);
    fs.access(pathFileRes, fs.F_OK, (error) => {
      if (error) {
        resolve(err());
        return;
      }
      pipeline(
        createReadStream(pathFileRes),
        createBrotliCompress(),
        createWriteStream(pathCompressRes),
        (error) => {
          if (error) {
            resolve(err());
          } else {
            resolve(console.log("File has been compressed!"));
          }
        }
      );
    });
  });
};
