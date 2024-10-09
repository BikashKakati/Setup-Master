import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class ReduxInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install redux react-redux");
    vscode.window.showInformationMessage("Redux installed successfully!");
  }
}
