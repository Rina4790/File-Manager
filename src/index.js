import { parseName } from "./hello.js";
import os from "os";
import { up } from "./up.js";
import { cd } from "./cd.js";
import { cp } from "./cp.js"
import { ls } from "./ls.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { rn } from "./rn.js";
import { mv } from "./mv.js";
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
    const data = line.toString().trim().replace(/ {1,}/g, " ").split(" ");
    let data2;
    if (line.includes('"')) {
      data2 = line.match(/".+?"/g)[0].replace(/^.|.$/g, "");
    } else {
      data2 = data[1];
    }
    const data1 = data[0].toLowerCase();

    const data3 = data[2];

    if (data1 === "up") {
      homedir = up(homedir);
    }
    if (data1 === "ls") {
      await ls(homedir);
    }
    if (data1 === "cd") {
      data2
        ? (homedir = cd(homedir, data2))
        : stdout.write("\n" + `Please, print commands > `);
    }
    if (data1 === "cat") {
      if (data2) await cat(homedir, data2);
      else stdout.write("\n" + `You didn't specify a file` + "\n");
	 }
	 if (data1 === "add") {
      if (data2) await add(homedir, data2);
      else stdout.write("\n" + `You didn't enter a file name` + "\n");
	 }
	 if (data1 === "rn") {
      if (data2 &&data3) await rn(homedir, data2, data3);
      else stdout.write("\n" + `You didn't enter a file name` + "\n");
	 }
	 if (data1 === "cp") {
      if (data2 &&data3) await cp(homedir, data2, data3);
      else stdout.write("\n" + `You didn't enter a file name` + "\n");
	 }
	 if (data1 === "mv") {
      if (data2 &&data3) await mv(homedir, data2, data3);
      else stdout.write("\n" + `You didn't enter a file name` + "\n");
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
