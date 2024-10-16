import * as vscode from "vscode";
import { DependencyInstaller } from "../dependencyInstaller";

export class nodemonInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install nodemon");
    vscode.window.showInformationMessage("nodemon installed successfully!");
  }
}
