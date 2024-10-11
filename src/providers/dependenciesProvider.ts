import * as vscode from "vscode";

export class DependencyItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description?: string,
    public readonly command?: vscode.Command,
    public checked: boolean = false // Track selection state
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${this.label}`;
    this.contextValue = "dependencyItem";
  }
}

export class DependenciesProvider
  implements vscode.TreeDataProvider<DependencyItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    DependencyItem | undefined | void
  > = new vscode.EventEmitter<DependencyItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
    DependencyItem | undefined | void
  > = this._onDidChangeTreeData.event;

  dependencies = [
    { label: "React", value: "react", checked: false },
    { label: "Vite", value: "vite", checked: false },
    { label: "Nextjs", value: "next", checked: false },
    { label: "Javascript", value: "js", checked: false },
    { label: "Typescript", value: "ts", checked: false },
    { label: "Tailwind", value: "tailwind", checked: false },
    { label: "shadcn", value: "shadcn", checked: false },
    { label: "Redux", value: "redux", checked: false },
    { label: "Axios", value: "axios", checked: false },
  ];

  private selectedDependencies: string[] = [];

  // Refresh TreeView
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DependencyItem): vscode.TreeItem {
    element.iconPath = element.checked
      ? new vscode.ThemeIcon("check")
      : new vscode.ThemeIcon("circle-outline");
    return element;
  }

  getChildren(element?: DependencyItem): Thenable<DependencyItem[]> {
    const dependencyItems = this.dependencies.map(
      (dep) =>
        new DependencyItem(
          dep.label,
          undefined,
          {
            command: "installer.toggleDependency",
            title: "Toggle Dependency",
            arguments: [dep],
          },
          dep.checked
        )
    );

    return Promise.resolve(dependencyItems);
  }

  // Toggle the selection (check/uncheck) of a dependency
  toggleDependency(dep: any) {
    dep.checked = !dep.checked;
    const topDependencies = ["react", "vite", "next"];

    if (dep.checked) {
      topDependencies.includes(dep.value)
        ? this.selectedDependencies.unshift(dep.value)
        : this.selectedDependencies.push(dep.value);
      vscode.window.showInformationMessage(`${dep.label} selected.`);
    } else {
      this.selectedDependencies = this.selectedDependencies.filter(
        (d) => d !== dep.value
      );
      vscode.window.showInformationMessage(`${dep.label} deselected.`);
    }
    this.refresh();
  }

  // Get all selected dependencies
  getSelectedDependencies(): string[] {
    return this.selectedDependencies;
  }

  // Clear selected dependencies after installation
  clearSelectedDependencies() {
    this.selectedDependencies = [];
    this.dependencies.forEach((dep) => (dep.checked = false));
    this.refresh();
  }
}
