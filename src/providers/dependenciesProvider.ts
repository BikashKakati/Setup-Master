import * as vscode from "vscode";

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
    { label: "Vite + Tailwind CSS", value: "vite-tailwind" },
    { label: "Redux", value: "redux" },
    { label: "Axios", value: "axios" },
  ];

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
