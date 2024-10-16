import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class GsapInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install gsap");
    vscode.window.showInformationMessage("GSAP installed successfully!");
  }
}
