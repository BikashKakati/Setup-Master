import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class reactHookFormInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-hook-form");
    vscode.window.showInformationMessage(
      "React Hook Form installed successfully!"
    );
  }
}
