import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class ReactIconsInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-icons");
    vscode.window.showInformationMessage("React Icons installed successfully!");
  }
}
