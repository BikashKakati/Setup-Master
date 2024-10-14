import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class jotaiInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install jotai");
    vscode.window.showInformationMessage("Jotai installed successfully!");
  }
}
