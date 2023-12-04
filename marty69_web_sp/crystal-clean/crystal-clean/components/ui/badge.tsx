import React from "react";

// Define the types for the props
interface BadgeProps {
  text: string;
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  switch (color) {
    case "gray":
      return (
        <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
          {text}
        </span>
      );
    case "red":
      return (
        <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
          {text}
        </span>
      );
    case "yellow":
      return (
        <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
          {text}
        </span>
      );
    case "green":
      return (
        <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
          {text}
        </span>
      );
    case "blue":
      return (
        <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
          {text}
        </span>
      );
    case "indigo":
      return (
        <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
          {text}
        </span>
      );
    case "purple":
      return (
        <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
          {text}
        </span>
      );
    case "pink":
      return (
        <span className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20">
          {text}
        </span>
      );
    default:
      return null; // or a default case
  }
};

export default Badge;
