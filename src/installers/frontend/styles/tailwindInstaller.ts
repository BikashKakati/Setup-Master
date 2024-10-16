import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class tailwindInstaller extends DependencyInstaller {
  install() {
    const tailwindConfigContent = `
      module.exports = {
        content: ['./src/**/*.{html,js,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      };`;
    const tailwindConfigCommand = `Set-Content -Path "tailwind.config.js" -Value "${tailwindConfigContent}" -Encoding UTF8`;

    // Write `index.css` with Tailwind CSS directives
    const indexCSSContent = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;`;

    const indexCSSCommand = `Set-Content -Path "src/index.css" -Value "${indexCSSContent}" -Encoding UTF8`;
    const dependencyArray = this.selectedDependencies;
    if (dependencyArray.includes("vite")) {
      this.runCommand("npm install -D tailwindcss postcss autoprefixer");
      this.runCommand("npx tailwindcss init -p");

      this.runCommand(tailwindConfigCommand);
      this.runCommand(indexCSSCommand);
    } else if (dependencyArray.includes("react")) {
      this.runCommand("npm install -D tailwindcss");
      this.runCommand("npx tailwindcss init");

      this.runCommand(tailwindConfigCommand);
      this.runCommand(indexCSSCommand);
    } else if (dependencyArray.includes("next")) {
      this.runCommand("npm install -D tailwindcss postcss autoprefixer");
      this.runCommand("npx tailwindcss init -p");

      const tailwindConfigContent = `
      module.exports = {
        content: [
          "./src/**/*.{js,ts,jsx,tsx,mdx}"
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      };`;

      const tailwindConfigCommand = `Set-Content -Path "tailwind.config.js" -Value \`${tailwindConfigContent
        .replace(/`/g, "``")
        .replace(/"/g, '\\"')}\` -Encoding UTF8`;

      this.runCommand(tailwindConfigCommand);

      const indexCSSCommand = `Set-Content -Path "src/app/global.css" -Value "${indexCSSContent}" -Encoding UTF8`;

      this.runCommand(indexCSSCommand);
    }

    vscode.window.showInformationMessage("Tailwind installed successfully!");
  }
}
