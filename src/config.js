import { stdout, chdir, cwd} from "node:process";
import * as path from "node:path";
export const ii = () => stdout.write("\n" + `Invalid input` + "\n");
export const err = () => stdout.write("\n" + `Operation failed` + "\n");
export const currentlyDir = (homedir) =>
  stdout.write("\n" + `You are currently in ${homedir}`);
export const printCommand = () =>
  stdout.write("\n" + `Please, print commands > `);
export const hello = (name) =>
  stdout.write(`Welcome to the File Manager, ${name}!`);
export const bye = (name) =>
  stdout.write(
    "\n" + `Thank you for using File Manager, ${name}, goodbye!` + "\n"
  );
export const pathResolve = (pathName)=> path.resolve(cwd(), pathName);