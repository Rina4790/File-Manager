import { parseName } from "./hello.js";
import os from "os";
import { up } from "./up.js";
import { cd } from "./cd.js";
import { cp } from "./cp.js";
import { ls } from "./ls.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { rn } from "./rn.js";
import { mv } from "./mv.js";
import { rm } from "./rm.js";
import { inf } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress } from "./zlib/compress.js";
import { decompress } from "./zlib/decompress.js";
import * as readlinePromises from "node:readline/promises";
import { ii, currentlyDir, printCommand, hello, bye } from "./config.js";

let homedir = os.homedir();
const name = parseName();

hello(name);
currentlyDir(homedir);

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myline = async () => {
  printCommand();
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
    switch (data1) {
      case "up":
        homedir = up(homedir);
        break;

      case "ls":
        await ls(homedir);
        break;

      case "cd":
        data2 ? (homedir = cd(homedir, data2)) : ii();
        break;

      case "rm":
        data2 ? await rm(homedir, data2) : ii();
        break;

      case "cat":
        data2 ? await cat(homedir, data2) : ii();
        break;

      case "add":
        data2 ? await add(homedir, data2) : ii();
        break;

      case "rn":
        data2 && data3 ? await rn(homedir, data2, data3) : ii();
        break;

      case "cp":
        data2 && data3 ? await cp(homedir, data2, data3) : ii();
        break;

      case "mv":
        data2 && data3 ? await mv(homedir, data2, data3) : ii();
        break;

      case "hash":
        data2 ? await hash(homedir, data2) : ii();
        break;

      case "os":
        data2 ? inf(data2) : ii();
        break;

      case "compress":
        data2 && data3 ? await compress(homedir, data2, data3) : ii();
        break;

      case "decompress":
        data2 && data3 ? await decompress(homedir, data2, data3) : ii();
        break;

      case ".exit":
        bye(name);
        process.exit(0);

      default:
        console.log(inputInvalid());
    }

    currentlyDir(homedir);
    printCommand();
  });
  rl.on("close", () => {
    bye(name);
    process.exit(0);
  });
};

myline();
