import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class ChartJsInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm install chart.js");
    vscode.window.showInformationMessage("Chart.js installed successfully!");
  }
}
