import * as fs from "fs";
import { DependencyInstaller } from "../../dependencyInstaller";
import { topFrontendDependenciesList } from "../../../constants";

export class expressInstaller extends DependencyInstaller {
  baseAppName = "backend";
  install() {
    if (
      this.selectedDependencies.some((dep) =>
        topFrontendDependenciesList.includes(dep)
      )
    ) {
      this.runCommand("cd ..");
    }

    const uniqueAppName = this.getUniqueAppDirectory(this.baseAppName);
    const appDirectory = `${this.workspaceRoot}/${uniqueAppName}`;

    // create the folder with unique name
    fs.mkdirSync(appDirectory);

    const insideToFolderCommand = `cd ${uniqueAppName}`;
    const initCommand = `npm init -y`;
    const installExpress = `npm install express`;
    this.runCommand(insideToFolderCommand);
    this.runCommand(initCommand);
    this.runCommand(installExpress);

    if (this.selectedDependencies.includes("back-ts")) {
      const typescriptCommands = `npm install typescript ts-node @types/node @types/express --save-dev`;
      this.runCommand(typescriptCommands);
      const tsconfigContent = `
      {
        "compilerOptions": {
          "target": "ES6",
          "module": "commonjs",
          "strict": true,
          "esModuleInterop": true,
          "skipLibCheck": true,
          "forceConsistentCasingInFileNames": true,
          "outDir": "./dist",
          "rootDir": "./src"
        }
      }
    `;
      const tsconfigPath = `${appDirectory}/tsconfig.json`;
      fs.writeFileSync(tsconfigPath, tsconfigContent);

      // Create basic backend folder and files
      const srcDir = `${appDirectory}/src`;
      fs.mkdirSync(srcDir);

      const serverFilePath = `${srcDir}/server.ts`;
      const serverFileContent = `
      import express, { Request, Response } from 'express';

      const app = express();
      const PORT = process.env.PORT || 3000;

      app.get('/', (req: Request, res: Response) => {
        res.send('Hello from Express with TypeScript!');
      });

      app.listen(PORT, () => {
        console.log(\`Server is running on port \${PORT}\`);
      });
    `;
      fs.writeFileSync(serverFilePath, serverFileContent);
      return;
    }
    // Create basic backend files like server.js
    const serverFilePath = `${appDirectory}/server.js`;
    const serverFileContent = `
      const express = require('express');
      const app = express();
      const PORT = process.env.PORT || 3000;

      app.get('/', (req, res) => {
        res.send('Hello from Express!');
      });

      app.listen(PORT, () => {
        console.log(\`Server is running on port \${PORT}\`);
      });
    `;
    fs.writeFileSync(serverFilePath, serverFileContent);
  }
}
