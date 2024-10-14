import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class axiosInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install axios");
    vscode.window.showInformationMessage("axios installed successfully!");
  }
}
