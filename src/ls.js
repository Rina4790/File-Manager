import { readdir } from "node:fs/promises";
import { err } from "./config.js";

export const ls = async (dir) => {
  let directoriesNames = [];
  let fileNames = [];
  let any_files = [];
  try {
    const files = await readdir(dir, { withFileTypes: true });
    files.map((file) => {
      if (file.isFile()) {
        fileNames.push({
          Name: file.name,
          Type: "File",
        });
      }
      if (file.isDirectory()) {
        directoriesNames.push({
          Name: file.name,
          Type: "Directory",
        });
      }
      if (!file.isDirectory() && !file.isFile()) {
        any_files.push({
          Name: file.name,
          Type: "Any type",
        });
      }
    });

    const commonNames = directoriesNames.concat(fileNames).concat(any_files);
    console.table(commonNames);
  } catch {
    err();
  }
};
