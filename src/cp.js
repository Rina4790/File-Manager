import { createReadStream, createWriteStream } from "fs";
import { basename, join, isAbsolute } from "path";

import { chdir, cwd } from "node:process";

export const cp = async (homedir, path_to_file, path_to_new_directory) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);
      const file = basename(path_to_file);
      path_to_new_directory = join(path_to_new_directory, file);
      const getPath = (path) => (isAbsolute(path) ? path : join(cwd(), path));
      path_to_file = getPath(path_to_file);
      path_to_new_directory = getPath(path_to_new_directory);

      const input = createReadStream(path_to_file);
      const output = createWriteStream(path_to_new_directory);

      input
        .on("error", (error) => {
          console.log("Caught", error);
          resolve();
        })
        .pipe(
          output
            .on("error", (error) => console.log("Caught", error))
            .on("finish", () => console.log("File has been copied"))
            .on("close", () => resolve())
        );
    });
  } catch (error) {
    console.log(error);
  }
};

