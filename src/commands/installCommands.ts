import * as vscode from "vscode";
import { getInstaller } from "./installerFactory";
import { DependenciesProvider } from "../providers/dependenciesProvider";

export function registerInstallCommand(
  context: vscode.ExtensionContext,
  dependenciesProvider: DependenciesProvider
) {
  // Command to toggle a dependency's selection
  vscode.commands.registerCommand("installer.toggleDependency", (dep) => {
    dependenciesProvider.toggleDependency(dep);
  });

  // Command to install all selected dependencies
  vscode.commands.registerCommand(
    "installer.installSelectedDependencies",
    async () => {
      const selectedDependencies =
        dependenciesProvider.getSelectedDependencies();

      if (selectedDependencies.length === 0) {
        vscode.window.showWarningMessage("No dependencies selected.");
        return;
      }

      const terminal = vscode.window.createTerminal("Install Dependencies");
      terminal.show(true);

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
      }
      const workspaceRoot = workspaceFolders[0].uri.fsPath;

      // Install dependencies one by one
      selectedDependencies.forEach((dep) => {
        const installer = getInstaller(
          selectedDependencies,
          dep,
          terminal,
          workspaceRoot
        );
        if (installer) {
          installer.install();
        }
      });

      vscode.window.showInformationMessage(
        `Installing ${selectedDependencies.length} dependencies...`
      );

      // Clear selected dependencies after installation
      dependenciesProvider.clearSelectedDependencies();
    }
  );
}
