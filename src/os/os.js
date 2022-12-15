import * as os from "node:os";

export const inf = (arg) => {
  if (arg === "--EOL") {
    console.log(JSON.stringify(os.EOL));
    return;
  }
  if (arg === "--cpus") {
    const param = os.cpus();
    console.log("Overall amount of CPUS: " + param.length);
    console.table(
      param.map((cpu) => ({
        model: cpu.model.split("@")[0].trim(),
        speed: `${cpu.speed / 1000} GHz`,
      }))
    );
    return;
  }
  if (arg === "--homedir") {
    console.log("Your home directory: ", os.homedir());
    return;
  }
  if (arg === "--username") {
    console.log("Your system user name: ", os.hostname());
    return;
  }
  if (arg === "--architecture") {
    console.log("CPU architecture: ", os.arch());
    return;
  } else {
    console.log(
      "Please, print commands: --EOL, --cpus, --homedir, --username, --architecture"
    );
  }
};
