import * as vscode from "vscode";
import { getInstaller } from "./installerFactory";
import { DependenciesProvider } from "../providers/dependenciesProvider";

export function registerInstallCommand(
  context: vscode.ExtensionContext,
  dependenciesProvider: DependenciesProvider
) {
  // Command to toggle a dependency's selection
  const toggleDependenciesCommand = vscode.commands.registerCommand(
    "installerDependencies.toggleDependency",
    (dep) => {
      dependenciesProvider.toggleDependency(dep);
    }
  );

  // create input box
  const inputBox = vscode.window.createInputBox();
  inputBox.onDidAccept(() => {
    const query = inputBox.value.trim();
    if (query) {
      dependenciesProvider.refresh(query);
    }
  });

  const searchCommand = vscode.commands.registerCommand(
    "installerDependencies.search",
    () => {
      inputBox.placeholder = "Search Dependencies";
      inputBox.show();
    }
  );

  const closeSearchResult = vscode.commands.registerCommand(
    "installerDependencies.close",
    () => {
      dependenciesProvider.refresh();
      inputBox.dispose();
    }
  );

  // Command to install all selected dependencies
  const installDependenciesCommand = vscode.commands.registerCommand(
    "installerDependencies.installSelectedDependencies",
    async () => {
      const selectedDependencies = [...dependenciesProvider.getSelectedFrontendDependencies(), ...dependenciesProvider.getSelectedBackendDependencies()];

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

      function installDependencies(selectedDependencies:string[]){
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
      }

      // Install dependencies one by one
      installDependencies(selectedDependencies);

      vscode.window.showInformationMessage(
        `Installing ${selectedDependencies.length} dependencies...`
      );

      // Clear selected dependencies after installation
      dependenciesProvider.clearSelectedDependencies();
    }
  );

  context.subscriptions.push(
    toggleDependenciesCommand,
    searchCommand,
    closeSearchResult,
    installDependenciesCommand
  );
}
