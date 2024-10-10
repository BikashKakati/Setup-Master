import * as vscode from "vscode";

export class DependencyInstaller {
  constructor(
    public terminal: vscode.Terminal,
    public workspaceRoot: string,
    public selectedDependencies: string[] = []
  ) {}

  runCommand(command: string) {
    this.terminal?.sendText(command);
  }

  install() {
    throw new Error("Install method not implemented.");
  }
}
