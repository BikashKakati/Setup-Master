import * as vscode from "vscode";
import { getInstaller } from "./installerFactory";

export function registerInstallCommand(context: vscode.ExtensionContext) {
  let selectedDependencies: string[] = [];

  vscode.commands.registerCommand(
    "installer.installDependency",
    async (dependency) => {
      selectedDependencies.push(dependency);

      const terminal = vscode.window.createTerminal("Install Dependencies");
      terminal.show(true);

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
      }
      const workspaceRoot = workspaceFolders[0].uri.fsPath;

      selectedDependencies.forEach((dep) => {
        const installer = getInstaller(dep, terminal, workspaceRoot);
        if (installer) {
          installer.install();
        }
      });
    }
  );
}
