import * as vscode from "vscode";
import { DependencyInstaller } from "../../dependencyInstaller";

export class mongodbInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install mongodb");
    this.runCommand("npm install mongoose");
    vscode.window.showInformationMessage("MongoDB installed successfully!");
  }
}
