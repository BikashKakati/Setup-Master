import * as path from "path";
import * as vscode from "vscode";
import { onlyOneSelectCategoriesList, topDependenciesList } from "../constants";
import { Category, Dependency, DependencyOrCategory } from "../types";

export class DependencyItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly value: string,
    public readonly description?: string,
    public readonly command?: vscode.Command,
    public checked: boolean = false,
    public iconPath: vscode.ThemeIcon | vscode.Uri | string="",
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
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
  readonly onDidChangeTreeData: vscode.Event<
    DependencyItem | undefined | void
  > = this._onDidChangeTreeData.event;

  private selectedDependencies: string[] = [];
  private dependencies: DependencyOrCategory[];
  private searchQuery: string | undefined;
  searchActive: boolean = false; // Tracks whether the search is active

  constructor(
    private context: vscode.ExtensionContext,
    dependencies: DependencyOrCategory[]
  ) {
    this.dependencies = dependencies;
  }

  private findCategoryByLabel(
    categories: DependencyOrCategory[],
    value: string
  ): Category | undefined {
    for (const cat of categories) {
      if (cat.value === value && "children" in cat) {
        return cat as Category;
      }
      if ("children" in cat) {
        const found = this.findCategoryByLabel(cat.children, value);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  refresh(searchQuery?: string): void {
    if (searchQuery) {
      this.searchQuery = searchQuery;
      this.searchActive = true;
    } else {
      this.searchQuery = undefined;
      this.searchActive = false;
    }
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DependencyItem): vscode.TreeItem {
    if (element.checked) {
      element.iconPath = new vscode.ThemeIcon("check");
    } else {
      element.iconPath = this.getIconPath(element.iconPath.toString())!;
    }
    return element;
  }

  getChildren(element?: DependencyItem): Thenable<DependencyItem[]> {
    if (!element) {
      const dependencyItem = this.dependencies.map((depOrCat) => {
        if ("collapsible" in depOrCat) {
          // It's a category
          return new DependencyItem(
            depOrCat.label,
            depOrCat.value,
            undefined,
            undefined,
            false,
            depOrCat.icon,
            vscode.TreeItemCollapsibleState.Collapsed // Categories are collapsible
          );
        } else {
          return new DependencyItem(
            depOrCat.label,
            depOrCat.value,
            undefined,
            {
              command: "installerDependencies.toggleDependency",
              title: "Select",
              arguments: [depOrCat],
            },
            depOrCat.checked,
            depOrCat.icon
          );
        }
      });

      if (this.searchQuery) {
        const searchResult = this.searchDependencies(this.searchQuery);
        return Promise.resolve([...searchResult, ...dependencyItem]);
      }
      return Promise.resolve(dependencyItem);
    } else {
      // Find the corresponding category for the selected element
      const category = this.findCategoryByLabel(
        this.dependencies,
        element.value
      );

      if (category && category.children) {
        return Promise.resolve(
          category.children.map((child) => {
            if ("collapsible" in child) {
              return new DependencyItem(
                child.label,
                child.value,
                undefined,
                undefined,
                false,
                child.icon,
                vscode.TreeItemCollapsibleState.Collapsed // Subcategories are also collapsible
              );
            } else {
              return new DependencyItem(
                child.label,
                child.value,
                undefined,
                {
                  command: "installerDependencies.toggleDependency",
                  title: "Select",
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

  findNearestParentCategory(
    dep: Dependency,
    currentCategories: Category[]
  ): Category | undefined {
    for (const category of currentCategories) {
      if ("children" in category) {
        // Check if the dependency is directly in this category's children
        const foundInChildren = category.children.some(
          (child) => child.value === dep.value
        );
        if (foundInChildren) {
          return category; // Return the current category if the dependency is found
        }

        // Recursively check each child that could be a category
        for (const child of category.children) {
          if ("children" in child) {
            const foundInNestedCategory = this.findNearestParentCategory(dep, [
              child,
            ]);
            if (foundInNestedCategory) {
              return foundInNestedCategory;
            }
          }
        }
      }
    }

    return undefined;
  }
  getAllDependencies(): DependencyItem[] {
    const allDependencies: DependencyItem[] = [];

    const traverseDependencies = (deps: DependencyOrCategory[]) => {
      deps.forEach((depOrCat) => {
        if ("children" in depOrCat) {
          // If it's a category, continue traversing
          traverseDependencies(depOrCat.children);
        } else {
          // If it's a dependency, add it to the array
          allDependencies.push(
            new DependencyItem(
              depOrCat.label,
              depOrCat.value,
              undefined,
              {
                command: "installerDependencies.toggleDependency",
                title: "Select",
                arguments: [depOrCat],
              },
              depOrCat.checked,
              depOrCat.icon
            )
          );
        }
      });
    };

    traverseDependencies(this.dependencies);
    return allDependencies;
  }

  searchDependencies(query: string): DependencyItem[] {
    const allDependencies = this.getAllDependencies();

    if (!query) {
      return allDependencies;
    }

    const filteredDependencies = allDependencies.filter((depItem) =>
      depItem.label.toLowerCase().includes(query.toLowerCase())
    );

    return filteredDependencies;
  }

  // Toggle the selection (check/uncheck) of a dependency
  toggleDependency(dep: Dependency) {
    // user can select only option, logic...
    const nearestParentCategory = this.findNearestParentCategory(
      dep,
      this.dependencies as Category[]
    );

    if (
      nearestParentCategory &&
      nearestParentCategory.children &&
      onlyOneSelectCategoriesList.includes(nearestParentCategory.label)
    ) {
      nearestParentCategory.children.forEach((child) => {
        if (!("children" in child) && child !== dep && child.checked) {
          child.checked = false; // Deselect other dependencies
          this.selectedDependencies = this.selectedDependencies.filter(
            (d) => d !== child.value
          );
        }
      });
    }
    const tailwindDependentLibraries = ["shadcn", "radixui"];

    if (
      tailwindDependentLibraries.includes(dep.value) &&
      !this.selectedDependencies.includes("tailwind")
    ) {
      this.dependencies.forEach((category: DependencyOrCategory) => {
        if ("children" in category) {
          category.children.forEach((subcategory: DependencyOrCategory) => {
            if ("children" in subcategory) {
              subcategory.children.forEach(
                (dependency: DependencyOrCategory) => {
                  if (
                    !("children" in dependency) &&
                    dependency.value === "tailwind"
                  ) {
                    dependency.checked = true;
                  }
                }
              );
            }
          });
        }
      });
      this.selectedDependencies.push("tailwind");
      vscode.window.showInformationMessage(`tailwind selected.`);
    }
    dep.checked = !dep.checked;

    if (dep.checked) {
      topDependenciesList.includes(dep.value)
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

  getSelectedDependencies(): string[] {
    return this.selectedDependencies;
  }

  // Clear selected dependencies
  clearSelectedDependencies() {
    this.selectedDependencies.forEach((dep) => {
      vscode.window.showInformationMessage(`${dep} Installing `);
    });

    this.selectedDependencies = [];
    function uncheckDependencies(dependencies: DependencyOrCategory[]) {
      dependencies.forEach((depOrCat) => {
        if ("children" in depOrCat) {
          // If the current item has children, recurse through its children
          uncheckDependencies(depOrCat.children);
        } else if (!("children" in depOrCat)) {
          // If the item has a value, it is a dependency, so uncheck it
          depOrCat.checked = false;
        }
      });
    }

    // Usage of the recursive function
    uncheckDependencies(this.dependencies);

    this.refresh();
  }
  // Helper function to get the icon path
  getIconPath(iconName: string): vscode.Uri | null {
    const assetPath = path.join(this.context.extensionPath, "assets");
    return vscode.Uri.file(path.join(assetPath, `${iconName}.png`));
  }
}
