import { chdir, cwd } from "node:process";
import * as path from "node:path";

export const cd = (homedir, newdir) => {
  let currentDir = chdir(homedir);
  if (!path.isAbsolute(newdir)) newdir = path.resolve(cwd(), newdir);

  try {
    chdir(newdir);
    currentDir = cwd();
  } catch (err) {
    chdir(homedir);
    currentDir = cwd();
    console.error(`This path does not exist. ${err}`);
  } finally {
    return currentDir;
  }
};



