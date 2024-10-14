import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { FrameworkInstaller } from "../installers/frontend/FrameworkInstaller";
import { ReduxInstaller } from "../installers/frontend/reduxInstaller";
import { axiosInstaller } from "../installers/common/axiosInstaller";
import { tailwindInstaller } from "../installers/frontend/tailwindInstaller";
import { ShadcnInstaller } from "../installers/frontend/shadcnInstaller";
import { zodInstaller } from "../installers/frontend/zodInstaller";
import { reactHookFormInstaller } from "../installers/frontend/reactHookFormInstaller";
import { zustandInstaller } from "../installers/frontend/zustandInstaller";
import { reactRouterInstaller } from "../installers/frontend/reactRouterInstaller";
import { reactQueryInstaller } from "../installers/frontend/rectQueryinstaller";
import { jotaiInstaller } from "../installers/frontend/jotaiInstaller";

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
    case "reactQuery":
      return new reactQueryInstaller(terminal, workspaceRoot);
    case "jotai":
      return new jotaiInstaller(terminal, workspaceRoot);
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
