import * as vscode from "vscode";
import * as fs from "fs";
import { execSync } from "child_process";

export class DependencyInstaller {
  constructor(
    public terminal: vscode.Terminal,
    public workspaceRoot: string,
    public selectedDependencies: string[] = []
  ) {}

  getUniqueAppDirectory(appName: string): string {
    let counter = 1;
    let fileName = appName;

    const getDirectories = (source: any = this.workspaceRoot) =>
      fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    const currentWorkspaceFolders = getDirectories();

    while (currentWorkspaceFolders.includes(fileName)) {
      fileName = `${appName}-${counter}`;
      counter++;
    }

    return fileName;
  }

  runCommand(command: string) {
    this.terminal?.sendText(command);
  }

  install() {
    throw new Error("Install method not implemented.");
  }
}
