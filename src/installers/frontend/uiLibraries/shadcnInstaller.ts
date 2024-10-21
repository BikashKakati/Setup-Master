import { DependencyInstaller } from "../../dependencyInstaller";
import * as vscode from "vscode";

export class shadcnInstaller extends DependencyInstaller {
  install() {
    const dependencyArray = this.selectedDependencies;
    if (dependencyArray.includes("next")) {
      this.runCommand("npx shadcn@latest init -d");
    }
    if (dependencyArray.includes("vite")) {
      const configJsonContent = `{
        "compilerOptions": {
          "baseUrl": ".",
          "paths": {
            "@/*": [
              "./src/*"
            ]
          }
        }
      }`;

      const viteConfigContent = `import path from "path";
      import react from "@vitejs/plugin-react";
      import { defineConfig } from "vite";
      
      export default defineConfig({
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      });`;

      const configJsonCommand = `Set-Content -Path "${
        dependencyArray.includes("ts") ? "tsconfig.json" : "jsconfig.json"
      }" -Value '${configJsonContent.replace(/'/g, "''")}' -Encoding UTF8`;

      const viteConfigCommand = `Set-Content -Path "${
        dependencyArray.includes("ts") ? "vite.config.ts" : "vite.config.js"
      }" -Value '${viteConfigContent.replace(/'/g, "''")}' -Encoding UTF8`;

      this.runCommand(configJsonCommand);
      this.runCommand("npm i -D @types/node");

      this.runCommand(viteConfigCommand);
      this.runCommand("npx shadcn@latest init -d");
    }
    vscode.window.showInformationMessage("Shadcn installed successfully!");
  }
}
