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
            { label: "JavaScript", value: "javascript", checked: false, icon: "javascript" },
            { label: "TypeScript", value: "typescript", checked: false, icon: "typescript" },
          ]
        },
        {
          label: "Frameworks",
          collapsible: true,
          children: [
            { label: "React", value: "react-js", checked: false, icon: "react" },
            { label: "Next", value: "next-js", checked: false, icon: "next" },
            { label: "Vite", value: "vite-js", checked: false, icon: "vite" },
          ]
        },
        {
          label: "Styles",
          collapsible: true,
          children: [
            { label: "Tailwind CSS", value: "tailwind-css", checked: false, icon: "tailwind-icon" },
            { label: "Bootstrap", value: "bootstrap", checked: false, icon: "bootstrap-icon" },
          ]
        },
        {
          label: "Other Libraries",
          collapsible: true,
          children: [
            { label: "Axios", value: "axios", checked: false, icon: "axios-icon" },
            { label: "Redux", value: "redux", checked: false, icon: "redux-icon" },
          ]
        },
      ],
    },
  ];