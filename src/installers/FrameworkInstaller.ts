import { DependencyInstaller } from "./dependencyInstaller";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class FrameworkInstaller extends DependencyInstaller {
  install() {
    const dependencyArray = this.selectedDependencies;
    let framework = "";
    if (dependencyArray.includes("vite")) {
      framework = "vite";
      const viteCommand = `npm create vite@latest my-vite-app -- --template  ${
        dependencyArray.includes("ts") ? "react-ts" : "react"
      }`;
      this.runCommand(viteCommand);
      this.runCommand("cd my-vite-app");
      this.runCommand("npm install");
    } else if (dependencyArray.includes("react")) {
      framework = "react";
      const craCommand = `npx create-react-app my-project  ${
        dependencyArray.includes("ts") ? "--template typescript" : ""
      }`;
      this.runCommand(craCommand);
      this.runCommand("cd my-project");
      this.runCommand("npm install");
    } else if (dependencyArray.includes("next")) {
      framework = "next";
      const nextCommand = `npx create-next-app@latest my-project ${
        dependencyArray.includes("ts") ? "--typescript" : "--javascript"
      } --eslint --src-dir --app --import-alias "@/src"
`;
      this.runCommand(nextCommand);
      this.runCommand("cd my-project");
      this.runCommand("npm install");
    }

    vscode.window.showInformationMessage(`${framework} setup complete!`);
  }
}
