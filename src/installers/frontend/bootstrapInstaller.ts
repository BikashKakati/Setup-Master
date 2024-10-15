import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class bootstrapInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install bootstrap");
    vscode.window.showInformationMessage("bootstrap installed successfully!");
  }
}
