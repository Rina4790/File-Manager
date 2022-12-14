import { createReadStream } from "node:fs";
import { chdir, cwd } from "node:process";
import * as path from "node:path";

export const cat = async (currentDir, fileName) => {
  try {
    chdir(currentDir);
    if (!path.isAbsolute(fileName)) fileName = path.resolve(cwd(), fileName);
    return new Promise((resolve, reject) => {
      const stream = createReadStream(fileName, "utf-8");
      stream.on("error", (error) => console.log(error));
      stream.on("data", (data) => {
        console.log(data);
      });
      stream.on("close", () => resolve());
    });
  } catch (error) {
    console.log(error);
  }
};
