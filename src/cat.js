import { createReadStream } from "node:fs";
import { chdir } from "node:process";
import { err, pathResolve } from "./config.js";

export const cat = async (currentDir, fileName) => {
  try {
    chdir(currentDir);
    const fileNameRes = pathResolve(fileName);
    return new Promise((resolve, reject) => {
      const stream = createReadStream(fileNameRes, "utf-8");
      stream.on("error", () => err());
      stream.on("data", (data) => {
        console.log(data);
      });
      stream.on("close", () => resolve());
    });
  } catch {
    err();
  }
};
