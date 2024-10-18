import { DependencyOrCategory } from "../types";

export const dependencies: DependencyOrCategory[] = [
  {
    label: "Frontend",
    value: "frontend",
    collapsible: true,
    icon: "frontend-icon",
    children: [
      {
        label: "Languages",
        value: "frontend-languages",
        collapsible: true,
        icon: "language-icon",
        children: [
          {
            label: "JavaScript",
            value: "frontend-js",
            checked: false,
            icon: "javascript",
          },
          {
            label: "TypeScript",
            value: "frontend-ts",
            checked: false,
            icon: "typescript",
          },
        ],
      },
      {
        label: "Frameworks",
        value: "frontend-frameworks",
        collapsible: true,
        icon: "framework-icon",
        children: [
          { label: "React", value: "frontend-react", checked: false, icon: "react" },
          { label: "Next", value: "frontend-next", checked: false, icon: "next" },
          { label: "Vite", value: "frontend-vite", checked: false, icon: "vite" },
        ],
      },
      {
        label: "Styles",
        value: "frontend-styles",
        collapsible: true,
        icon: "styles-icon",
        children: [
          {
            label: "Tailwind CSS",
            value: "frontend-tailwind",
            checked: false,
            icon: "tailwind-icon",
          },
          {
            label: "Bootstrap",
            value: "frontend-bootstrap",
            checked: false,
            icon: "bootstrap-icon",
          },
        ],
      },
      {
        label: "UI Libraries",
        value: "frontend-ui-libraries",
        collapsible: true,
        icon: "ui-libraries-icon",
        children: [
          {
            label: "Shadcn",
            value: "frontend-shadcn",
            checked: false,
            icon: "shadcn-icon",
          },
        ],
      },
      {
        label: "State Management",
        value: "frontend-state-management",
        collapsible: true,
        icon: "state-manage-icon",
        children: [
          {
            label: "Redux",
            value: "frontend-redux",
            checked: false,
            icon: "redux-icon",
          },
          {
            label: "Jotai",
            value: "frontend-jotai",
            checked: false,
            icon: "jotai-icon",
          },
          {
            label: "Zustand",
            value: "frontend-zustand",
            checked: false,
            icon: "zustand-icon",
          },
        ],
      },
      {
        label: "Icons",
        value: "frontend-icons",
        collapsible: true,
        icon: "icons-icon",
        children: [
          {
            label: "Lucide Icons",
            value: "frontend-lucideIcons",
            checked: false,
            icon: "lucide-icon",
          },
          {
            label: "React Icons",
            value: "frontend-reactIcons",
            checked: false,
            icon: "react-icon-icon",
          },
        ],
      },
      {
        label: "Charts",
        value: "frontend-charts",
        collapsible: true,
        icon: "charts-icon",
        children: [
          {
            label: "Chart.js",
            value: "frontend-chartjs",
            checked: false,
            icon: "chartjs-icon",
          },
          {
            label: "Recharts",
            value: "frontend-recharts",
            checked: false,
            icon: "not-found-icon",
          },
        ],
      },
      {
        label: "Notifications",
        value: "frontend-notification",
        collapsible: true,
        icon: "notification-icon",
        children: [
          {
            label: "React toastify",
            value: "frontend-rectToastify",
            checked: false,
            icon: "not-found-icon",
          },
          {
            label: "React Hot Toast",
            value: "frontend-reactHotToast",
            checked: false,
            icon: "not-found-icon",
          },
        ],
      },
      {
        label: "Animations",
        value: "frontend-animation",
        collapsible: true,
        icon: "animation-icon",
        children: [
          {
            label: "Framer Motion",
            value: "frontend-framerMotion",
            checked: false,
            icon: "framer-motion-icon",
          },
          {
            label: "Gsap",
            value: "frontend-gsap",
            checked: false,
            icon: "gsap-icon",
          },
        ],
      },
      {
        label: "Other Libraries",
        value: "frontend-other-libraries",
        collapsible: true,
        icon: "other-icon",
        children: [
          {
            label: "Axios",
            value: "frontend-axios",
            checked: false,
            icon: "axios-icon",
          },
          {
            label: "React Query",
            value: "frontend-reactQuery",
            checked: false,
            icon: "react-query-icon",
          },
          { label: "Zod", value: "frontend-zod", checked: false, icon: "zod-icon" },
          {
            label: "React Datatable Component",
            value: "frontend-reactDatatableComponent",
            checked: false,
            icon: "not-found-icon",
          },
          {
            label: "Momentjs",
            value: "frontend-moment",
            checked: false,
            icon: "moment-icon",
          },
          {
            label: "React Hook Form",
            value: "frontend-reactHookForm",
            checked: false,
            icon: "react-hook-form-icon",
          },
        ],
      },
    ],
  },
  {
    label: "Backend",
    value: "backend",
    icon: "backend-icon",
    collapsible: true,
    children: [
      {
        label: "Languages",
        value: "backend-languages",
        collapsible: true,
        icon: "language-icon",
        children: [
          {
            label: "JavaScript",
            value: "backend-js",
            checked: false,
            icon: "javascript",
          },
          {
            label: "TypeScript",
            value: "backend-ts",
            checked: false,
            icon: "typescript",
          },
        ],
      },
      {
        label: "Frameworks",
        value: "backend-frameworks",
        collapsible: true,
        icon: "framework-icon",
        children: [
          {
            label: "Express",
            value: "backend-express",
            checked: false,
            icon: "express-icon",
          },
        ],
      },
      {
        label: "Databases",
        value: "backend-databases",
        collapsible: true,
        icon: "database-icon",
        children: [
          {
            label: "MongoDB",
            value: "backend-mongodb",
            checked: false,
            icon: "mongodb-icon",
          },
        ],
      },

      {
        label: "Other Library",
        value: "backend-other-libraries",
        collapsible: true,
        icon: "other-icon",
        children: [
          {
            label: "Nodemon",
            value: "backend-nodemon",
            checked: false,
            icon: "nodemon-icon",
          },
          {
            label: "Axios",
            value: "backend-axios",
            checked: false,
            icon: "axios-icon",
          },
          {
            label: "Json Web Token",
            value: "backend-jwt",
            checked: false,
            icon: "jwt-icon",
          },
          {
            label: "Cors",
            value: "backend-cors",
            checked: false,
            icon: "not-found-icon",
          },
        ],
      },
    ],
  },
];
export const onlyOneSelectCategoriesList: string[] = [
  "Frameworks",
  "Styles",
  "Languages",
  "State Management",
];
export const topDependenciesList: string[] = ["frontend-react", "frontend-vite", "frontend-next"];

export const tailwindDependentLibraries = ["frontend-shadcn", "frontend-radixui"];
