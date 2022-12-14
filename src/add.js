import { chdir, cwd } from "node:process";
import * as path from "node:path";
import * as fs from "node:fs";

export const add = async (currentDir, fileName) => {
  try {
    chdir(currentDir);
    if (!path.isAbsolute(fileName)) fileName = path.resolve(cwd(), fileName);
    fs.open(fileName, "a", (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};
