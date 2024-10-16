import * as vscode from "vscode";
import { DependencyInstaller } from "../../dependencyInstaller";

export class FramerMotionInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install framer-motion");
    vscode.window.showInformationMessage(
      "Framer Motion installed successfully!"
    );
  }
}
