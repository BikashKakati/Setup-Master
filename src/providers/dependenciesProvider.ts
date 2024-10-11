import * as vscode from "vscode";
import * as path from "path"; 
import { Category, Dependency, DependencyOrCategory } from "../types";





export class DependencyItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description?: string,
    public readonly command?: vscode.Command,
    public checked: boolean = false, 
    public iconPath?: vscode.ThemeIcon | vscode.Uri | string, 
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    super(label, collapsibleState);
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
  readonly onDidChangeTreeData: vscode.Event<DependencyItem | undefined | void> =
    this._onDidChangeTreeData.event;

  private selectedDependencies: string[] = [];
  private dependencies: DependencyOrCategory[];

  constructor(private context: vscode.ExtensionContext, dependencies: DependencyOrCategory[]) {
    this.dependencies = dependencies;
  } 


private findCategoryByLabel(categories: DependencyOrCategory[], label: string): Category | undefined {
  for (const cat of categories) {
    if (cat.label === label && 'children' in cat) {
      return cat as Category;
    }
    if ('children' in cat) {
      const found = this.findCategoryByLabel(cat.children, label);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}




  refresh(): void {
    this._onDidChangeTreeData.fire();
  }


  getTreeItem(element: DependencyItem): vscode.TreeItem {
    if (element.checked) {
      element.iconPath = new vscode.ThemeIcon("check");
    } else if (element.iconPath) {
      element.iconPath = this.getIconPath(element.iconPath.toString()); 
    } else {
      element.iconPath = new vscode.ThemeIcon("circle-outline"); 
    }
    return element;
  }


  getChildren(element?: DependencyItem): Thenable<DependencyItem[]> {
    if (!element) {
      return Promise.resolve(
        this.dependencies.map((depOrCat) => {
          if ('collapsible' in depOrCat) {
            // It's a category
            return new DependencyItem(
              depOrCat.label,
              undefined,
              undefined,
              false,
              undefined,
              vscode.TreeItemCollapsibleState.Collapsed // Categories are collapsible
            );
          } else {
            return new DependencyItem(
              depOrCat.label,
              undefined,
              {
                command: 'installer.toggleDependency',
                title: 'Toggle Dependency',
                arguments: [depOrCat],
              },
              depOrCat.checked,
              depOrCat.icon
            );
          }
        })
      );
    } else {
      // Find the corresponding category for the selected element
      const category = this.findCategoryByLabel(this.dependencies, element.label);
  
      if (category && category.children) {
        return Promise.resolve(
          category.children.map((child) => {
            if ('collapsible' in child) {
              return new DependencyItem(
                child.label,
                undefined,
                undefined,
                false,
                undefined,
                vscode.TreeItemCollapsibleState.Collapsed // Subcategories are also collapsible
              );
            } else {
              return new DependencyItem(
                child.label,
                undefined,
                {
                  command: 'installer.toggleDependency',
                  title: 'Toggle Dependency',
                  arguments: [child],
                },
                child.checked,
                child.icon
              );
            }
          })
        );
      }
    }
  
    return Promise.resolve([]);
  }
  
  

  // Toggle the selection (check/uncheck) of a dependency
  toggleDependency(dep: Dependency) {
    dep.checked = !dep.checked;
    if (dep.checked) {
      this.selectedDependencies.push(dep.value);
      vscode.window.showInformationMessage(`${dep.label} selected.`);
    } else {
      this.selectedDependencies = this.selectedDependencies.filter(
        (d) => d !== dep.value
      );
      vscode.window.showInformationMessage(`${dep.label} deselected.`);
    }
    this.refresh();
  }


  getSelectedDependencies(): string[] {
    return this.selectedDependencies;
  }

  // Clear selected dependencies
  clearSelectedDependencies() {
    this.selectedDependencies = [];
    this.dependencies.forEach((dep) => {
      if (!('collapsible' in dep)) {
        dep.checked = false;
      }
    });
    this.refresh();
  }

  // Helper function to get the icon path
  getIconPath(iconName: string): vscode.Uri | vscode.ThemeIcon {
    const assetPath = path.join(this.context.extensionPath, "assets");
    if(!iconName){
      return new vscode.ThemeIcon("circle-outline");
    }
    return vscode.Uri.file(path.join(assetPath, `${iconName}.png`));
  }
}
