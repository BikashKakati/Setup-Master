import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class zustandInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install zustnd");
    vscode.window.showInformationMessage("Zustand installed successfully!");
  }
}
