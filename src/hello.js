export const parseName = () => {
  let arr = process.argv;
  let name = "*noname*";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith("--username")) {
      name = arr[i].slice(11);
    }
  }
  return name;
};
