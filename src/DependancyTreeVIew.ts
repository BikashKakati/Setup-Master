import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// Tree item for dependencies
export class DependencyItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description?: string,
    public readonly command?: vscode.Command
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${this.label}`;
  }
}

// Provider for the TreeView to display dependencies
export class DependenciesProvider
  implements vscode.TreeDataProvider<DependencyItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    DependencyItem | undefined | void
  > = new vscode.EventEmitter<DependencyItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    DependencyItem | undefined | void
  > = this._onDidChangeTreeData.event;

  // List of dependencies
  dependencies = [
    { label: "Vite + Tailwind CSS", value: "vite-tailwind" },
    { label: "Redux", value: "redux" },
    { label: "React Router", value: "react-router-dom" },
    { label: "Axios", value: "axios" },
    { label: "Styled Components", value: "styled-components" },
    { label: "Custom Package (Enter Manually)", value: "custom" },
  ];

  constructor() {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DependencyItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: DependencyItem): Thenable<DependencyItem[]> {
    return Promise.resolve(
      this.dependencies.map(
        (dep) =>
          new DependencyItem(dep.label, undefined, {
            command: "installer.installDependency",
            title: "Install",
            arguments: [dep.value],
          })
      )
    );
  }
}

export function activate(context: vscode.ExtensionContext) {
  const dependenciesProvider = new DependenciesProvider();
  vscode.window.registerTreeDataProvider(
    "installerDependencies",
    dependenciesProvider
  );

  let selectedDependencies: string[] = [];

  vscode.commands.registerCommand(
    "installer.installDependency",
    async (dependency) => {
      selectedDependencies.push(dependency);

      const terminal = vscode.window.createTerminal("Install Dependencies");
      terminal.show(true);

      if (selectedDependencies.includes("vite-tailwind")) {
        // Step 1: Create a new Vite project
        terminal.sendText(
          `npm create vite@latest my-vite-app --template react`
        );
        terminal.sendText(`cd my-vite-app`);
        terminal.sendText(`npm install -D tailwindcss postcss autoprefixer`);
        terminal.sendText(`npx tailwindcss init -p`);

        // Step 2: Update index.css and tailwind.config.js
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
          vscode.window.showErrorMessage("No workspace folder is open.");
          return;
        }
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        const projectDir = path.join(workspaceRoot, "my-vite-app");
        const srcDir = path.join(projectDir, "src");

        // Ensure directories exist before writing files
        if (!fs.existsSync(projectDir)) {
          fs.mkdirSync(projectDir);
        }
        if (!fs.existsSync(srcDir)) {
          fs.mkdirSync(srcDir);
        }

        // Write `tailwind.config.js`
        const tailwindConfigContent = `
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
        const tailwindConfigCommand = `Set-Content -Path "tailwind.config.js" -Value "${tailwindConfigContent}" -Encoding UTF8`;
        terminal.sendText(tailwindConfigCommand);

        // Write `index.css` with Tailwind CSS directives
        const indexCSSContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;`;

        const indexCSSCommand = `Set-Content -Path "src/index.css" -Value "${indexCSSContent}" -Encoding UTF8`;
        terminal.sendText(indexCSSCommand);

        vscode.window.showInformationMessage(
          "Vite project with Tailwind CSS set up successfully!"
        );

        // Install additional packages after setting up Vite
        const additionalPackages = selectedDependencies.filter(
          (dep) => dep !== "vite-tailwind"
        );
        if (additionalPackages.length > 0) {
          terminal.sendText(`npm install ${additionalPackages.join(" ")}`);
        }
      }
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("installer.refreshDependencies", () =>
      dependenciesProvider.refresh()
    )
  );
}

export function deactivate() {}
