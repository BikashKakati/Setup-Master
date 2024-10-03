import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "installer.helloWorld",
    async () => {
      const dependencies = [
        { label: "Vite + Tailwind CSS", value: "vite-tailwind" },
        { label: "Redux", value: "redux" },
        { label: "React Router", value: "react-router-dom" },
        { label: "Axios", value: "axios" },
        { label: "Styled Components", value: "styled-components" },
        { label: "Custom Package (Enter Manually)", value: "custom" },
      ];

      const selected = await vscode.window.showQuickPick(
        dependencies.map((dep) => dep.label),
        {
          placeHolder: "Select dependencies to install",
          canPickMany: true,
        }
      );

      if (!selected || selected.length === 0) {
        vscode.window.showInformationMessage("No dependencies selected.");
        return;
      }

      let customPackages: string[] = [];
      if (selected.includes("Custom Package (Enter Manually)")) {
        const customInput = await vscode.window.showInputBox({
          placeHolder: "Enter package names (comma-separated)",
          prompt:
            "Enter custom packages you want to install (e.g., lodash, moment)",
        });
        if (customInput) {
          customPackages = customInput.split(",").map((pkg) => pkg.trim());
        } else {
          vscode.window.showWarningMessage("No custom packages entered.");
        }
      }

      const selectedPackages = dependencies
        .filter((dep) => selected.includes(dep.label) && dep.value !== "custom")
        .map((dep) => dep.value);

      const allPackages = [...selectedPackages, ...customPackages];

      if (allPackages.length === 0) {
        vscode.window.showInformationMessage("No valid dependencies selected.");
        return;
      }

      const hasViteTailwind = selectedPackages.includes("vite-tailwind");

      try {
        const terminal = vscode.window.createTerminal("Install Dependencies");
        terminal.show(true);

        if (hasViteTailwind) {
          // Step 1: Create a new Vite project
          terminal.sendText(
            "npm create vite@latest my-vite-app --template react"
          );

          // Step 2: Change to the new directory
          terminal.sendText("cd my-vite-app");

          // Step 3: Install Tailwind CSS and its dependencies
          terminal.sendText("npm install -D tailwindcss postcss autoprefixer");

          // Step 4: Initialize Tailwind CSS
          terminal.sendText("npx tailwindcss init");

          // Step 5: Create postcss.config.js file
          terminal.sendText(
            `echo "module.exports = { plugins: [require('tailwindcss'), require('autoprefixer')] };" > postcss.config.js`
          );

          // Step 6: Create Tailwind config and index.css
          terminal.sendText(
            `echo "module.exports = { purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], darkMode: false, theme: { extend: {}, }, variants: { extend: {}, }, plugins: [], }" > tailwind.config.js`
          );
          terminal.sendText(
            `echo "@tailwind base; @tailwind components; @tailwind utilities;" > ./src/index.css`
          );

          vscode.window.showInformationMessage(
            "Vite project with Tailwind CSS set up successfully!"
          );

          // Install additional packages after Vite and Tailwind setup
          const additionalPackages = allPackages.filter(
            (pkg) => pkg !== "vite-tailwind"
          );
          if (additionalPackages.length > 0) {
            terminal.sendText(
              `npm install ${additionalPackages.join(" ")} --prefix my-vite-app`
            );
          }
        } else {
          const installCommand = `npm install ${allPackages.join(" ")}`;
          terminal.sendText(installCommand);
          vscode.window.showInformationMessage(
            `Installing: ${allPackages.join(", ")}`
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            "Failed to run terminal command: " + error.message
          );
        } else {
          vscode.window.showErrorMessage("An unknown error occurred.");
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
