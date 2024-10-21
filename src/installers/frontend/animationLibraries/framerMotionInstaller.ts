import * as vscode from "vscode";
import { DependencyInstaller } from "../../dependencyInstaller";

export class framerMotionInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install framer-motion");
    vscode.window.showInformationMessage(
      "Framer Motion installed successfully!"
    );
  }
}
