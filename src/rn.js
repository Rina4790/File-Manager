import { rename } from "node:fs/promises";
import { chdir } from "node:process";
import { err, pathResolve } from "./config.js";

export const rn = async (currentDir, fileNameOld, fileNameNew) => {
  try {
    chdir(currentDir);
    const fileNameOldRes = pathResolve(fileNameOld);
    const fileNameNewRes = pathResolve(fileNameNew);
    await rename(fileNameOldRes, fileNameNewRes);
    console.log("The file was successfully renamed!");
  } catch {
    err();
  }
};
