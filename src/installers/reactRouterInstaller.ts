import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class reactRouterInstaller extends DependencyInstaller {
  install() {
    if (this.selectedDependencies.includes("next")) {
      return;
    }
    this.runCommand("npm install react-router");
    vscode.window.showInformationMessage(
      "React Router installed successfully!"
    );
  }
}
