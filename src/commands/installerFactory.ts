import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { MomentJsInstaller } from "../installers/common/MomentJsInstaller";
import { ExpressInstaller } from "../installers/backend/frameworks/expressInstaller";
import { jwtInstaller } from "../installers/backend/jwtInstaller";
import { nodemonInstaller } from "../installers/backend/nodemonInstaller";
import { corsInstaller } from "../installers/backend/corsInstaller";
import { mongodbInstaller } from "../installers/backend/databases/mongoInstaller";
import { ReduxInstaller } from "../installers/frontend/State-management/reduxInstaller";
import { axiosInstaller } from "../installers/common/axiosInstaller";
import { zodInstaller } from "../installers/frontend/Other-libraries/zodInstaller";
import { zustandInstaller } from "../installers/frontend/State-management/zustandInstaller";
import { reactRouterInstaller } from "../installers/frontend/Other-libraries/reactRouterInstaller";
import { reactHookFormInstaller } from "../installers/frontend/Other-libraries/reactHookFormInstaller";
import { reactQueryInstaller } from "../installers/frontend/Other-libraries/rectQueryinstaller";
import { jotaiInstaller } from "../installers/frontend/State-management/jotaiInstaller";
import { tailwindInstaller } from "../installers/frontend/Styles/tailwindInstaller";
import { ShadcnInstaller } from "../installers/frontend/UI-libraries/shadcnInstaller";
import { LucideIconsInstaller } from "../installers/frontend/Other-libraries/LucideIconsInstaller";
import { ReactIconsInstaller } from "../installers/frontend/Other-libraries/ReactIconsInstaller";
import { ChartJsInstaller } from "../installers/frontend/Charts/ChartJsInstaller";
import { RechartInstaller } from "../installers/frontend/Charts/RechartInstaller";
import { FrameworkInstaller } from "../installers/frontend/Framerworks/FrameworkInstaller";
import { ReactToastifyInstaller } from "../installers/frontend/Other-libraries/ReactToastifyInstaller";
import { ReactHotToastInstaller } from "../installers/frontend/Other-libraries/ReactHotToastInstaller";
import { FramerMotionInstaller } from "../installers/frontend/Animation-libraries/FramerMotionInstaller";
import { GsapInstaller } from "../installers/frontend/Animation-libraries/GsapInstaller";
import { ReactDatatableComponentInstaller } from "../installers/frontend/Other-libraries/ReactDatatableComponentInstaller";

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
    case "mongodb":
      return new mongodbInstaller(terminal, workspaceRoot);
    default:
      return null;
  }
}
