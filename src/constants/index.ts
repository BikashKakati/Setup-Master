import { DependencyOrCategory } from "../types";

export const dependencies: DependencyOrCategory[] = [
  {
    label: "Frontend",
    collapsible: true,
    children: [
      {
        label: "Languages",
        collapsible: true,
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
        collapsible: true,
        children: [
          { label: "React", value: "react", checked: false, icon: "react" },
          { label: "Next", value: "next", checked: false, icon: "next" },
          { label: "Vite", value: "vite", checked: false, icon: "vite" },
        ],
      },
      {
        label: "Styles",
        collapsible: true,
        children: [
          {
            label: "Tailwind CSS",
            value: "tailwind",
            checked: false,
            icon: "tailwind-icon",
          },
          {
            label: "Shadcn",
            value: "shdcn",
            checked: false,
            icon: "shadcn-icon",
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
        label: "Other Libraries",
        collapsible: true,
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
          { label: "Zod", value: "zod", checked: false, icon: "zod-icon" },
          {
            label: "React Hook Form",
            value: "reactHookForm",
            checked: false,
            icon: "reactHookForm-icon",
          },
        ],
      },
    ],
  },
];
