import { basename, join, isAbsolute } from "path";
import * as fs from "node:fs";
import { chdir, cwd } from "node:process";
import { pipeline } from "node:stream";

export const cp = async (homedir, path_to_file, path_to_new_directory) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);
      const file = basename(path_to_file);
      const getPath = (path) => (isAbsolute(path) ? path : join(cwd(), path));
      path_to_file = getPath(path_to_file);
      path_to_new_directory = getPath(join(path_to_new_directory, file));

      fs.access(path_to_file, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          resolve();
          return;
        }
        pipeline(
          fs.createReadStream(path_to_file),
          fs.createWriteStream(path_to_new_directory),
          (err) => {
            if (err) {
              console.log("The file was not copied!", err);
              resolve();
            } else {
              console.log("The file was copied!");
              resolve();
            }
          }
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
};
