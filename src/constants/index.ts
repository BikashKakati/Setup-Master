import { DependencyOrCategory } from "../types";

export const dependencies: DependencyOrCategory[] = [
  {
    label: "Frontend",
    value:"frontend",
    collapsible: true,
    icon: "frontend-icon",
    children: [
      {
        label: "Languages",
        value:"frontend-languages",
        collapsible: true,
        icon: "language-icon",
        children: [
          {
            label: "JavaScript",
            value: "js",
            checked: false,
            icon: "javascript",
          },
          {
            label: "TypeScript",
            value: "ts",
            checked: false,
            icon: "typescript",
          },
        ],
      },
      {
        label: "Frameworks",
        value:"frontend-frameworks",
        collapsible: true,
        icon: "framework-icon",
        children: [
          { label: "React", value: "react", checked: false, icon: "react" },
          { label: "Next", value: "next", checked: false, icon: "next" },
          { label: "Vite", value: "vite", checked: false, icon: "vite" },
        ],
      },
      {
        label: "Styles",
        value:"frontend-styles",
        collapsible: true,
        icon: "styles-icon",
        children: [
          {
            label: "Tailwind CSS",
            value: "tailwind",
            checked: false,
            icon: "tailwind-icon",
          },
          {
            label: "Bootstrap",
            value: "bootstrap",
            checked: false,
            icon: "bootstrap-icon",
          },
        ],
      },
      {
        label: "UI Libraries",
        value:"frontend-ui-libraries",
        collapsible: true,
        icon: "ui-libraries-icon",
        children: [
          {
            label: "Shadcn",
            value: "shadcn",
            checked: false,
            icon: "shadcn-icon",
          },
        ],
      },
      {
        label: "Other Libraries",
        value:"frontend-other-libraries",
        collapsible: true,
        icon: "other-icon",
        children: [
          {
            label: "Axios",
            value: "axios",
            checked: false,
            icon: "axios-icon",
          },
          {
            label: "Redux",
            value: "redux",
            checked: false,
            icon: "redux-icon",
          },
          {
            label: "React Query",
            value: "reactQuery",
            checked: false,
            icon: "react-query-icon",
          },
          {
            label: "Jotai",
            value: "jotai",
            checked: false,
            icon: "jotai-icon",
          },
          { label: "Zod", value: "zod", checked: false, icon: "zod-icon" },
          {
            label: "Zustand",
            value: "zustand",
            checked: false,
            icon: "zustand-icon",
          },
          {
            label: "React Hook Form",
            value: "reactHookForm",
            checked: false,
            icon: "react-hook-form-icon",
          },
        ],
      },
    ],
  },
  {
    label:"Backend",
    value:"backend",
    icon:"backend-icon",
    collapsible:true,
    children: [
      {
        label: "Languages",
        value:"backend-languages",
        collapsible: true,
        icon: "language-icon",
        children: [
          {
            label: "JavaScript",
            value: "js",
            checked: false,
            icon: "javascript",
          },
          {
            label: "TypeScript",
            value: "ts",
            checked: false,
            icon: "typescript",
          },
        ],
      },
      {
        label: "Frameworks",
        value:"backend-frameworks",
        collapsible: true,
        icon: "framework-icon",
        children: [
          { label: "Express", value: "express", checked: false, icon: "express-icon" },
        ],
      },
      
      {
        label: "Other Library",
        value:"backend-other-libraries",
        collapsible: true,
        icon: "other-icon",
        children: [
          {
            label: "Nodemon",
            value: "nodemon",
            checked: false,
            icon: "nodemon-icon",
          },
          {
            label: "Axios",
            value: "axios",
            checked: false,
            icon: "axios-icon",
          },
          {
            label: "Json Web Token",
            value: "jwt",
            checked: false,
            icon: "jwt-icon",
          },
          {
            label: "Cors",
            value: "cors",
            checked: false,
            icon: "cors-icon",
          },
        ],
      },
    ],
  }
];
export const onlyOneSelectCategoriesList: string[] = [
  "Frameworks",
  "Styles",
  "Languages",
];
export const topDependenciesList: string[] = ["react", "vite", "next"];
