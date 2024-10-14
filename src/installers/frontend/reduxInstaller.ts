import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class ReduxInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-redux @reduxjs/toolkit");
    vscode.window.showInformationMessage("Redux installed successfully!");
  }
}
