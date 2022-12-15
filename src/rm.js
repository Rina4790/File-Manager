import { join, isAbsolute } from "path";
import * as fs from "node:fs";
import { chdir, cwd } from "node:process";

export const rm = async (homedir, path_to_file) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);

      const getPath = (path) => (isAbsolute(path) ? path : join(cwd(), path));
      path_to_file = getPath(path_to_file);

      fs.unlink(path_to_file, (err) => {
        if (err) {
          console.log("The file was not deleted!", err);
          resolve();
        } else {
          console.log("File was deleted!");
          resolve();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
