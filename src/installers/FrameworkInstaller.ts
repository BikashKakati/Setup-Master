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
    } else if (dependencyArray.includes("react")) {
      framework = "react";
      const craCommand = `npx create-react-app my-project --template ${
        dependencyArray.includes("ts") ? "typescript" : ""
      }`;
      this.runCommand(craCommand);
      this.runCommand("cd my-project");
    } else if (dependencyArray.includes("next")) {
      framework = "next";
      const nextCommand = `npx create-next-app@latest my-project ${
        dependencyArray.includes("ts") ? "--typescript" : "--javascript"
      } --eslint --src-dir --app --import-alias "@/src"
`;
      this.runCommand(nextCommand);
      this.runCommand("cd my-project");
    }

    vscode.window.showInformationMessage(`${framework} setup complete!`);
  }
}
