import * as vscode from "vscode";
import { DependencyInstaller } from "../dependencyInstaller";

export class jwtInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install jsonwebtoken");
    vscode.window.showInformationMessage("J W T installed successfully!");
  }
}
