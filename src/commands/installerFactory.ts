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
import { LucideIconsInstaller } from "../installers/frontend/LucideIconsInstaller";
import { ReactIconsInstaller } from "../installers/frontend/ReactIconsInstaller";
import { ChartJsInstaller } from "../installers/frontend/ChartJsInstaller";
import { RechartInstaller } from "../installers/frontend/RechartInstaller";
import { ReactToastifyInstaller } from "../installers/frontend/ReactToastifyInstaller";
import { ReactHotToastInstaller } from "../installers/frontend/ReactHotToastInstaller";
import { FramerMotionInstaller } from "../installers/frontend/FramerMotionInstaller";
import { GsapInstaller } from "../installers/frontend/GsapInstaller";
import { ReactDatatableComponentInstaller } from "../installers/frontend/ReactDatatableComponentInstaller";
import { MomentJsInstaller } from "../installers/common/MomentJsInstaller";
import { ExpressInstaller } from "../installers/backend/frameworks/expressInstaller";
import { jwtInstaller } from "../installers/backend/jwtInstaller";
import { nodemonInstaller } from "../installers/backend/nodemonInstaller";
import { corsInstaller } from "../installers/backend/corsInstaller";

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
    case "lucideIcons":
      return new LucideIconsInstaller(terminal, workspaceRoot);

    case "reactIcons":
      return new ReactIconsInstaller(terminal, workspaceRoot);

    case "chartjs":
      return new ChartJsInstaller(terminal, workspaceRoot);

    case "recharts":
      return new RechartInstaller(terminal, workspaceRoot);

    case "rectToastify":
      return new ReactToastifyInstaller(terminal, workspaceRoot);

    case "reactHotToast":
      return new ReactHotToastInstaller(terminal, workspaceRoot);

    case "framerMotion":
      return new FramerMotionInstaller(terminal, workspaceRoot);

    case "gsap":
      return new GsapInstaller(terminal, workspaceRoot);

    case "reactDatatableComponent":
      return new ReactDatatableComponentInstaller(terminal, workspaceRoot);

    case "moment":
      return new MomentJsInstaller(terminal, workspaceRoot);
    //backend
    case "express":
      return new ExpressInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "nodemon":
      return new nodemonInstaller(terminal, workspaceRoot);
    case "cors":
      return new corsInstaller(terminal, workspaceRoot);
    case "jwt":
      return new jwtInstaller(terminal, workspaceRoot);
    default:
      return null;
  }
}
