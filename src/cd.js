import { chdir, cwd } from "node:process";
import { err, pathResolve } from "./config.js";

export const cd = (homedir, newdir) => {
  let currentDir = chdir(homedir);
  const newdir_res = pathResolve(newdir);

  try {
    chdir(newdir_res);
    currentDir = cwd();
  } catch {
    chdir(homedir);
    currentDir = cwd();
    err();
  } finally {
    return currentDir;
  }
};
