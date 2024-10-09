import { registerInstallCommand } from "./commands/installCommands";
import { DependenciesProvider } from "./providers/dependenciesProvider";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const dependenciesProvider = new DependenciesProvider();

  // Register the TreeView for dependencies
  vscode.window.registerTreeDataProvider(
    "installerDependencies",
    dependenciesProvider
  );

  // Register the install command
  registerInstallCommand(context, dependenciesProvider);

  // Add an "Install All" button in the status bar
  const installAllButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  installAllButton.text = "$(cloud-download) Install All Dependencies"; // Icon and text
  installAllButton.command = "installer.installSelectedDependencies"; // Command to trigger
  installAllButton.tooltip = "Click to install all selected dependencies";
  installAllButton.show(); // Make sure the button is visible

  context.subscriptions.push(installAllButton); // Clean up the button when deactivated
}

export function deactivate() {}
