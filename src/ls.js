import { readdir } from "node:fs/promises";

export const ls = async (dir) => {
  let directoriesNames = [];
  let fileNames = [];
  try {
    const files = await readdir(dir, { withFileTypes: true });
    for await (const dirent of files)
      if (dirent.isDirectory()) {
        directoriesNames.push({
          Name: dirent.name,
          Type: "Directory",
        });
      } else {
        fileNames.push({
          Name: dirent.name,
          Type: "File",
        });
      }

    const commonNames = directoriesNames.concat(fileNames);
    console.table(commonNames);
  } catch (err) {
    console.error(err);
  }
};
