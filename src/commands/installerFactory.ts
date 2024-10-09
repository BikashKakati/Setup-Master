import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { ViteTailwindInstaller } from "../installers/viteTailwindInstaller";
import { ReduxInstaller } from "../installers/reduxInstaller";
import { axiosInstaller } from "../installers/axiosInstaller";

export function getInstaller(
  dependency: string,
  terminal: vscode.Terminal,
  workspaceRoot: string
): DependencyInstaller | null {
  switch (dependency) {
    case "vite-tailwind":
      return new ViteTailwindInstaller(terminal, workspaceRoot);
    case "redux":
      return new ReduxInstaller(terminal, workspaceRoot);
    case "axios":
      return new axiosInstaller(terminal, workspaceRoot);
    default:
      return null;
  }
}
