import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class reactQueryInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-query");
    vscode.window.showInformationMessage("React Query installed successfully!");
  }
}
