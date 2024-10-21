import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class rechartInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install recharts");
    vscode.window.showInformationMessage("Recharts installed successfully!");
  }
}
