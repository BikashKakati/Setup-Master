import { registerInstallCommand } from "./commands/installCommands";
import { DependenciesProvider } from "./providers/dependenciesProvider";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const dependenciesProvider = new DependenciesProvider();
  vscode.window.registerTreeDataProvider(
    "installerDependencies",
    dependenciesProvider
  );

  registerInstallCommand(context);
}

export function deactivate() {}
