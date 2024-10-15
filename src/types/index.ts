export interface Dependency {
  label: string;
  value: string;
  checked: boolean;
  icon: string;
}

export interface Category {
  label: string;
  value:string;
  collapsible: boolean;
  icon: string;
  children: Dependency[] | Category[];
}

export type DependencyOrCategory = Category | Dependency;
