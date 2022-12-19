import { basename, join } from "path";
import * as fs from "node:fs";
import { chdir } from "node:process";
import { pipeline } from "node:stream";
import { err, pathResolve } from "./config.js";

export const mv = async (homedir, path_to_file, path_to_new_directory) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);
      const file = basename(path_to_file);
      const path_to_file_res = pathResolve(path_to_file);
      const path_to_new_directory_res = pathResolve(
        join(path_to_new_directory, file)
      );

      const del = (path) =>
        fs.unlink(path, (error) => {
          if (error) err();
          resolve(console.log("File was moved!"));
        });

      fs.access(path_to_file_res, fs.F_OK, (error) => {
        if (error) {
          resolve(err());
          return;
        }
        pipeline(
          fs.createReadStream(path_to_file_res),
          fs.createWriteStream(path_to_new_directory_res),
          (error) => {
            if (error) {
              resolve(err());
            } else {
              del(path_to_file_res);
            }
          }
        );
      });
    });
  } catch {
    err();
  }
};
