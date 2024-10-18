import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class ReactToastifyInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install react-toastify");
    vscode.window.showInformationMessage("React Toastify installed successfully!");
  }
}
