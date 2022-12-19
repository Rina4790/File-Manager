import { chdir } from "node:process";
import * as crypto from "node:crypto";
import { createReadStream } from "node:fs";
import { err, pathResolve } from "../config.js";

export const hash = async (currentDir, path_to_file) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(currentDir);
      const path_to_file_res = pathResolve(path_to_file);
      const hash = crypto.createHash("sha256");
      const stream = createReadStream(path_to_file_res);
      stream.on("error", () => resolve(err()));
      stream.on("data", (data) => hash.update(data));
      stream.on("end", () => resolve(console.log(hash.digest("hex"))));
    });
  } catch {
    err();
  }
};
