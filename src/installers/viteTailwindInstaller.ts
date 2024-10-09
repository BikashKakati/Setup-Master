import { DependencyInstaller } from "./dependencyInstaller";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class ViteTailwindInstaller extends DependencyInstaller {
  install() {
    this.runCommand("npm create vite@latest my-vite-app --template react");
    this.runCommand("cd my-vite-app");
    this.runCommand("npm install -D tailwindcss postcss autoprefixer");
    this.runCommand("npx tailwindcss init -p");

    const projectDir = path.join(this.workspaceRoot, "my-vite-app");
    const srcDir = path.join(projectDir, "src");

    const tailwindConfigContent = `
    module.exports = {
      content: ['./src/**/*.{html,js,ts,tsx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    };`;
    const tailwindConfigCommand = `Set-Content -Path "tailwind.config.js" -Value "${tailwindConfigContent}" -Encoding UTF8`;
    this.runCommand(tailwindConfigCommand);

    // Write `index.css` with Tailwind CSS directives
    const indexCSSContent = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;`;

    const indexCSSCommand = `Set-Content -Path "src/index.css" -Value "${indexCSSContent}" -Encoding UTF8`;
    this.runCommand(indexCSSCommand);

    vscode.window.showInformationMessage("Vite + Tailwind setup complete!");
  }
}
