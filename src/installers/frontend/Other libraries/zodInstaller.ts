import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class zodInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install zod");
    vscode.window.showInformationMessage("Zod installed successfully!");
  }
}
