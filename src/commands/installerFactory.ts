import * as vscode from "vscode";
import { DependencyInstaller } from "../installers/dependencyInstaller";
import { momentJsInstaller } from "../installers/common/momentJsInstaller";
import { expressInstaller} from "../installers/backend/frameworks/expressInstaller";
import { jwtInstaller } from "../installers/backend/jwtInstaller";
import { nodemonInstaller } from "../installers/backend/nodemonInstaller";
import { corsInstaller } from "../installers/backend/corsInstaller";
import { mongodbInstaller } from "../installers/backend/databases/mongoInstaller";
import { reduxInstaller } from "../installers/frontend/stateManagement/reduxInstaller";
import { axiosInstaller } from "../installers/common/axiosInstaller";
import { zodInstaller } from "../installers/frontend/otherLibraries/zodInstaller";
import { zustandInstaller } from "../installers/frontend/stateManagement/zustandInstaller";
import { reactRouterInstaller } from "../installers/frontend/otherLibraries/reactRouterInstaller";
import { reactHookFormInstaller } from "../installers/frontend/otherLibraries/reactHookFormInstaller";
import { jotaiInstaller } from "../installers/frontend/stateManagement/jotaiInstaller";
import { tailwindInstaller } from "../installers/frontend/styleLibraries/tailwindInstaller";
import { shadcnInstaller } from "../installers/frontend/uiLibraries/shadcnInstaller";
import { lucideIconsInstaller } from "../installers/frontend/otherLibraries/lucideIconsInstaller";
import { reactIconsInstaller } from "../installers/frontend/otherLibraries/reactIconsInstaller";
import { chartJsInstaller } from "../installers/frontend/charts/chartJsInstaller";
import { rechartInstaller } from "../installers/frontend/charts/rechartInstaller";
import { frameworkInstaller } from "../installers/frontend/frameworks/frameworkInstaller";
import { reactToastifyInstaller } from "../installers/frontend/otherLibraries/reactToastifyInstaller";
import { reactHotToastInstaller } from "../installers/frontend/otherLibraries/reactHotToastInstaller";
import { framerMotionInstaller } from "../installers/frontend/animationLibraries/framerMotionInstaller";
import { gsapInstaller } from "../installers/frontend/animationLibraries/gsapInstaller";
import { reactDatatableComponentInstaller } from "../installers/frontend/otherLibraries/reactDatatableComponentInstaller";
import { reactQueryInstaller } from "../installers/frontend/otherLibraries/reactQueryinstaller";

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
      return new frameworkInstaller(
        terminal,
        workspaceRoot,
        selectedDependencies
      );
    case "frontend-redux":
      return new reduxInstaller(terminal, workspaceRoot);
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
      return new shadcnInstaller(terminal, workspaceRoot, selectedDependencies);
    case "frontend-lucideIcons":
      return new lucideIconsInstaller(terminal, workspaceRoot);

    case "frontend-reactIcons":
      return new reactIconsInstaller(terminal, workspaceRoot);

    case "frontend-chartjs":
      return new chartJsInstaller(terminal, workspaceRoot);

    case "frontend-recharts":
      return new rechartInstaller(terminal, workspaceRoot);

    case "frontend-rectToastify":
      return new reactToastifyInstaller(terminal, workspaceRoot);

    case "frontend-reactHotToast":
      return new reactHotToastInstaller(terminal, workspaceRoot);

    case "frontend-framerMotion":
      return new framerMotionInstaller(terminal, workspaceRoot);

    case "frontend-gsap":
      return new gsapInstaller(terminal, workspaceRoot);

    case "frontend-reactDatatableComponent":
      return new reactDatatableComponentInstaller(terminal, workspaceRoot);

    case "frontend-moment":
    case "backend-moment":
      return new momentJsInstaller(terminal, workspaceRoot);
    //backend
    case "backend-express":
      return new expressInstaller(
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
