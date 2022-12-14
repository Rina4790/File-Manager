import { createReadStream, createWriteStream, unlink } from "fs";
import { basename, join, isAbsolute } from "path";
import { chdir, cwd } from "node:process";

export const mv = async (homedir, path_to_file, path_to_new_directory) => {
  try {
    return new Promise((resolve, reject) => {
      chdir(homedir);
      const file = basename(path_to_file);
      path_to_new_directory = join(path_to_new_directory, file);
      const getPath = (path) => (isAbsolute(path) ? path : join(cwd(), path));
      path_to_file = getPath(path_to_file);
      path_to_new_directory = getPath(path_to_new_directory);

      const input = createReadStream(path_to_file);
		 const output = createWriteStream(path_to_new_directory);
		 
		 const del = (path)=> unlink(path, (err) => {
			if (err) throw err;
			console.log('File was moved');
		 });

      input
        .on("error", (error) => {
          console.log("Caught", error);
          resolve();
        })
        .pipe(
          output
            .on("error", (error) => console.log("Caught", error))
				  .on("finish", () => {
					  del(path_to_file)
					
				})
            .on("close", () => resolve())
        );
    });
  } catch (error) {
    console.log(error);
  }
};

//  await cp ('/home/karina', '/home/karina/new1.txt', '/home/karina/diplom')

