import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class MomentJsInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install moment");
    vscode.window.showInformationMessage("Moment.js installed successfully!");
  }
}