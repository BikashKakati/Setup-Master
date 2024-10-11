import { DependencyInstaller } from "./dependencyInstaller";
import * as vscode from "vscode";

export class ShadcnInstaller extends DependencyInstaller {
  install() {
    const dependencyArray = this.selectedDependencies;
    if (dependencyArray.includes("next")) {
      this.runCommand("npx shadcn@latest init -d");
    }
    vscode.window.showInformationMessage("Shadcn installed successfully!");
  }
}
