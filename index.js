#!/usr/bin/env node

const chalk = require("chalk");
const execSync = require("child_process").execSync;
const fs = require("fs-extra");
const path = require("path");

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
    var data = fs.readJsonSync(path.join(__dirname, "dependencies.json"));
    var depString = "";
    Object.keys(data.dependencies).forEach(dep => {
      depString = depString + ` ${dep}@${data.dependencies[dep]}`;
    });
    execSync(`cd ${appName} && yarn add ${depString}`, { stdio: "inherit" });
    console.log(chalk.green("\nFinished installing packages\n"));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const copyDockerFiles = () => {
  try{
    console.log(chalk.cyan("\nCopying Docker files in app...\n"));
    console.log(chalk.cyan("\nCopying .dockerignore\n"));
    execSync(`cp ${path.join(__dirname, ".dockerignore")} ${appName}/.dockerignore`)
    console.log(chalk.cyan("\nCopying Dockerfile\n"));
    execSync(`cp ${path.join(__dirname, "Dockerfile")} ${appName}/Dockerfile`)
    console.log(chalk.cyan("\nCopying docker-compose.yml\n"));
    execSync(`cp ${path.join(__dirname, "docker-compose.yml")} ${appName}/docker-compose.yml`)
    console.log(chalk.cyan("\nCopying nginx.conf\n"));
    execSync(`cp ${path.join(__dirname, "nginx.conf")} ${appName}/nginx.conf`)
  } catch(e){
    console.log(e);
    return false;
  }
}

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
succes = copyDockerFiles()
if (!success) {
  console.log(
    chalk.red("Something went wrong while trying to copy docker files")
  );
  return false;
}
console.log(chalk.green("All done"));
