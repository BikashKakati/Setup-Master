import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { FrameworkInstaller } from "../installers/FrameworkInstaller";
import { ReduxInstaller } from "../installers/reduxInstaller";
import { axiosInstaller } from "../installers/axiosInstaller";
import { tailwindInstaller } from "../installers/tailwindInstaller";
import { ShadcnInstaller } from "../installers/shadcnInstaller";
import { zodInstaller } from "../installers/zodInstaller";
import { reactHookFormInstaller } from "../installers/reactHookFormInstaller";
import { zustandInstaller } from "../installers/zustandInstaller";
import { reactRouterInstaller } from "../installers/reactRouterInstaller";

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
    case "zod":
      return new zodInstaller(terminal, workspaceRoot);
    case "zustand":
      return new zustandInstaller(terminal, workspaceRoot);
    case "reactRouter":
      return new reactRouterInstaller(terminal, workspaceRoot);
    case "reactHookForm":
      return new reactHookFormInstaller(terminal, workspaceRoot);
    case "tailwind":
      return new tailwindInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "shadcn":
      return new ShadcnInstaller(terminal, workspaceRoot, selectedDependencies);
    default:
      return null;
  }
}
