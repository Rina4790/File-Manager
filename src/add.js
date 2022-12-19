import { chdir, cwd } from "node:process";
import * as fs from "node:fs";
import { err, pathResolve } from "./config.js";

export const add = async (currentDir, fileName) => {
  try {
    chdir(currentDir);
    const newPath = pathResolve(fileName)
    return new Promise((resolve, reject) => {
      fs.open(newPath, "a", (error) => {
        if (error) resolve(err());
        else resolve(console.log("The file was created!"));
      });
    });
  } catch {
    err();
  }
};
