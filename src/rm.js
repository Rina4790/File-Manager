import * as fs from "node:fs";
import { chdir } from "node:process";
import { err, pathResolve } from "./config.js";

export const rm = async (homedir, path_to_file) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);
      const path_to_fileRes = pathResolve(path_to_file);

      fs.unlink(path_to_fileRes, (error) => {
        if (error) {
          resolve(err());
        } else resolve(console.log("File was deleted!"));
      });
    });
  } catch {
    err();
  }
};
