import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { FrameworkInstaller } from "../installers/FrameworkInstaller";
import { ReduxInstaller } from "../installers/reduxInstaller";
import { axiosInstaller } from "../installers/axiosInstaller";
import { tailwindInstaller } from "../installers/tailwindInstaller";

export function getInstaller(
  selectedDependencies: string[],
  dependency: string,
  terminal: vscode.Terminal,
  workspaceRoot: string
): DependencyInstaller | null {
  switch (dependency) {
    case "vite":
    case "react":
    case "next":
      return new FrameworkInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "redux":
      return new ReduxInstaller(terminal, workspaceRoot);
    case "axios":
      return new axiosInstaller(terminal, workspaceRoot);
    case "tailwind":
      return new tailwindInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    default:
      return null;
  }
}
