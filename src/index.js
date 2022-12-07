import { parseName } from "./hello.js";
import os from "os";
import { up } from "./up.js";
import { ls } from "./ls.js";
import * as readlinePromises from "node:readline/promises";
import { argv, chdir, cwd, stdin, stdout } from "node:process";

let homedir = os.homedir();
const name = parseName();
const result = `Welcome to the File Manager, ${name}!`;
const bye = `Thank you for using File Manager, ${name}!`;
console.log(result);

console.log(`You are currently in ${homedir}`);

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myline = async () => {
  stdout.write(`Please, print commands > `);
  rl.on("line", async (line) => {
    const data = line.trim().toLowerCase();
    if (data === "up") {
      homedir = up(homedir);
    }
    if (data === "ls") {
      await ls(homedir);
    }
    stdout.write(`You are currently in ${homedir}`);
    stdout.write("\n" + `Please, print commands > `);
  });
  rl.on("close", () => {
    console.log("\n" + bye);
    process.exit(0);
  });
};

myline();
