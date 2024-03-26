import { spawn } from "child_process";
import loadEnv from "../envs/loadEnv.js";

var ls;

if (process.argv.includes("-p")) {
  loadEnv("production");
} else if (process.argv.includes("-s")) {
  loadEnv("staging");
} else {
  loadEnv("development");
}

if (process.argv.includes("build")) {
  ls = spawn(`yarn`, ["next", "build"]);
} else if (process.argv.includes("start")) {
  ls = spawn(`yarn`, ["next", "start"]);
} else {
  ls = spawn(`yarn`, ["next", "dev"]);
}

ls.on("exit", () => {
  console.log(`Done`);
});

ls.stdout.on("data", (output) => {
  console.log(`${output}`);
});

ls.stdout.on("error", (error) => {
  console.log(`❌ ${error}`);
});

ls.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});
