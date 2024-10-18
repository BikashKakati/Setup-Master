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
    case "frontend-vite":
    case "frontend-react":
    case "frontend-next":
      return new FrameworkInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "frontend-redux":
      return new ReduxInstaller(terminal, workspaceRoot);
    case "frontend-axios":
    case "backend-axios":
      return new axiosInstaller(terminal, workspaceRoot);
    case "frontend-zod":
      return new zodInstaller(terminal, workspaceRoot);
    case "frontend-zustand":
      return new zustandInstaller(terminal, workspaceRoot);
    case "frontend-reactRouter":
      return new reactRouterInstaller(terminal, workspaceRoot);
    case "frontend-reactHookForm":
      return new reactHookFormInstaller(terminal, workspaceRoot);
    case "frontend-reactQuery":
      return new reactQueryInstaller(terminal, workspaceRoot);
    case "frontend-jotai":
      return new jotaiInstaller(terminal, workspaceRoot);
    case "frontend-tailwind":
      return new tailwindInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "frontend-shadcn":
      return new ShadcnInstaller(terminal, workspaceRoot, selectedDependencies);
    case "frontend-lucideIcons":
      return new LucideIconsInstaller(terminal, workspaceRoot);

    case "frontend-reactIcons":
      return new ReactIconsInstaller(terminal, workspaceRoot);

    case "frontend-chartjs":
      return new ChartJsInstaller(terminal, workspaceRoot);

    case "frontend-recharts":
      return new RechartInstaller(terminal, workspaceRoot);

    case "frontend-rectToastify":
      return new ReactToastifyInstaller(terminal, workspaceRoot);

    case "frontend-reactHotToast":
      return new ReactHotToastInstaller(terminal, workspaceRoot);

    case "frontend-framerMotion":
      return new FramerMotionInstaller(terminal, workspaceRoot);

    case "frontend-gsap":
      return new GsapInstaller(terminal, workspaceRoot);

    case "frontend-reactDatatableComponent":
      return new ReactDatatableComponentInstaller(terminal, workspaceRoot);

    case "frontend-moment":
      return new MomentJsInstaller(terminal, workspaceRoot);
    //backend
    case "backend-express":
      return new ExpressInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "backend-nodemon":
      return new nodemonInstaller(terminal, workspaceRoot);
    case "backend-cors":
      return new corsInstaller(terminal, workspaceRoot);
    case "backend-jwt":
      return new jwtInstaller(terminal, workspaceRoot);
    case "backend-mongodb":
      return new mongodbInstaller(terminal, workspaceRoot);
    default:
      return null;
  }
}
