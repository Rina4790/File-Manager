import { chdir, cwd } from "node:process";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { createReadStream } from "node:fs";

export const hash = async (currentDir, path_to_file) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(currentDir);
      if (!path.isAbsolute(path_to_file))
        path_to_file = path.resolve(cwd(), path_to_file);

      const hash = crypto.createHash("sha256");
      const stream = createReadStream(path_to_file);
      stream.on("error", (err) => resolve(console.log(err)));
      stream.on("data", (data) => hash.update(data));
      stream.on("end", () => resolve(console.log(hash.digest("hex"))));
    });
  } catch (err) {
    console.log(err);
  }
};
