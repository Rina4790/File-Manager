import { cwd, chdir } from "node:process";

export const up = (dir) => {
  chdir(dir);
  chdir("../");
  const currentDir = cwd();
  return currentDir;
};
