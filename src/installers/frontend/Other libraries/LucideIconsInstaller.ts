import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class LucideIconsInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install lucide-react");
    vscode.window.showInformationMessage(
      "Lucide Icons installed successfully!"
    );
  }
}
