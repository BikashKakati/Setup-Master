import { registerInstallCommand } from "./commands/installCommands";
import { dependencies } from "./constants";
import { DependenciesProvider } from "./providers/dependenciesProvider";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const dependenciesProvider = new DependenciesProvider(context, dependencies);

  // Register the TreeView for dependencies
  vscode.window.registerTreeDataProvider(
    "installerDependencies",
    dependenciesProvider
  );

  // Register the install command
  registerInstallCommand(context, dependenciesProvider);

  const installAllButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  installAllButton.text = "$(cloud-download)"; // Icon and text
  installAllButton.command = "installerDependencies.installSelectedDependencies";
  installAllButton.tooltip = "Click to install all selected dependencies";
  installAllButton.show(); 

  context.subscriptions.push(installAllButton); // Clean up the button when deactivated
}

export function deactivate() {}
