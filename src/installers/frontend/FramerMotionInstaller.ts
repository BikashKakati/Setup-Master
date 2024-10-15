import { DependencyInstaller } from "../dependencyInstaller";
import * as vscode from "vscode";

export class FramerMotionInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install framer-motion");
    vscode.window.showInformationMessage("Framer Motion installed successfully!");
  }
}
