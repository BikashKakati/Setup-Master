import * as vscode from "vscode";
import { DependencyInstaller } from "../dependencyInstaller";

export class corsInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install cors");
    vscode.window.showInformationMessage("Cors installed successfully!");
  }
}
