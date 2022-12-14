import { rename } from "node:fs/promises";
import { chdir, cwd } from "node:process";
import * as path from "node:path";

export const rn = async (currentDir, fileNameOld, fileNameNew) => {
  try {
    chdir(currentDir);
    if (!path.isAbsolute(fileNameOld))
      fileNameOld = path.resolve(cwd(), fileNameOld);
    if (!path.isAbsolute(fileNameNew))
      fileNameNew = path.resolve(cwd(), fileNameNew);

    await rename(fileNameOld, fileNameNew);
    console.log("The file was successfully renamed!" + "\n");
  } catch (error) {
    console.log(error);
  }
};
