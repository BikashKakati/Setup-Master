import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class reactHotToastInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-hot-toast");
    vscode.window.showInformationMessage("React Hot Toast installed successfully!");
  }
}
