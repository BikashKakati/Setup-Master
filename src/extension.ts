import { registerInstallCommand } from "./commands/registerCommands";
import { dependencies } from "./constants";
import { DependenciesProvider } from "./providers/dependenciesProvider";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const dependenciesProvider = new DependenciesProvider(context, dependencies);

  // Register the install command
  registerInstallCommand(context, dependenciesProvider);
}

export function deactivate() {}
