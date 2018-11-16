#!/usr/bin/env node

const chalk = require("chalk");
const execSync = require("child_process").execSync;

let appName = process.argv[2];

function createReactApp() {
  try {
    if (appName) {
      console.log(chalk.cyan("Creating React App"));
      execSync(
        `create-react-app ${appName} --scripts-version conatel-react-scripts`,
        { stdio: "inherit" }
      );
      return true;
    } else {
      console.log(chalk.orange("\nNo app name was provided."));
      console.log("\nProvide an app name in the following format: ");
      console.log(chalk.cyan("\ncreate-conatel-reactI-app ", "app-name\n"));
      return false;
    }
  } catch (e) {
    return false;
  }
}

const installPackages = () => {
  try {
    console.log(chalk.cyan("\nInstalling dependencies\n"));
    execSync(`cd ${appName} && yarn add redux`, { stdio: "inherit" });
    console.log(chalk.green("\nFinished installing packages\n"));
    return true;
  } catch (e) {
    return false;
  }
};

let success = createReactApp();
if (!success) {
  console.log(
    chalk.red(
      "Something went wrong while trying to create a new React app using create-react-app"
    )
  );
  return false;
}
console.log(chalk.green("Moving to app directory and installing packages"));
success = installPackages();
if (!success) {
  console.log(
    chalk.red("Something went wrong while trying to install dependencies")
  );
  return false;
}
console.log(chalk.green("All done"));
