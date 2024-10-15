import { DependencyInstaller } from "./dependencyInstaller";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class FrameworkInstaller extends DependencyInstaller {
  baseAppName = "my-project";
  private getUniqueAppDirectory(appName: string): string {
    let counter = 1;
    let fileName = appName;
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage("No workspace folder is open.");
      return "";
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;

    const getDirectories = (source: any = workspacePath) =>
      fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    const currentWorkspaceFolders = getDirectories();

    while (currentWorkspaceFolders.includes(fileName)) {
      fileName = `${appName}-${counter}`;
      counter++;
    }

    return fileName;
  }

  install() {
    const dependencyArray = this.selectedDependencies;
    let framework = "";
    const uniqueAppName = this.getUniqueAppDirectory(this.baseAppName);

    if (dependencyArray.includes("vite")) {
      framework = "vite";
      const viteCommand = `npm create vite@latest ${uniqueAppName} -- --template  ${
        dependencyArray.includes("ts") ? "react-ts" : "react"
      }`;
      this.runCommand(viteCommand);
      this.runCommand(`cd ${uniqueAppName}`);
      this.runCommand("npm install");
    } else if (dependencyArray.includes("react")) {
      framework = "react";

      const craCommand = `npx create-react-app ${uniqueAppName}  ${
        dependencyArray.includes("ts") ? "--template typescript" : ""
      }`;
      this.runCommand(craCommand);
      this.runCommand(`cd ${uniqueAppName}`);
      this.runCommand("npm install");
    } else if (dependencyArray.includes("next")) {
      framework = "next";

      const nextCommand = `npx create-next-app@latest ${uniqueAppName} ${
        dependencyArray.includes("ts") ? "--typescript" : "--javascript"
      } --no-tailwind --eslint --src-dir --app --import-alias '@/*' --yes
`;
      this.runCommand(nextCommand);
      this.runCommand(`cd ${uniqueAppName}`);
      this.runCommand("npm install");
    }

    vscode.window.showInformationMessage(`${framework} setup complete!`);
  }
}
