// @ts-check

import { fixupPluginRules } from "@eslint/compat";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import reactRecommendedPlugin from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

// 환경 설정
const baseConfig = {
  ignores: ["dist", "*.gen.ts"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      React: "readonly",
      browser: true,
      es2020: true,
    },
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
};

// 타입스크립트 설정
const typescriptConfig = {
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  languageOptions: {
    parser: tsParser,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
};

// React 설정
const reactConfig = {
  plugins: {
    "react-hooks": fixupPluginRules(reactHooksPlugin),
    "react-refresh": fixupPluginRules(reactRefreshPlugin),
    react: reactRecommendedPlugin,
  },
  files: ["**/*.{jsx,tsx}"],
  languageOptions: {
    ...reactRecommendedPlugin.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
      React: "readonly",
    },
  },
  rules: {
    ...reactHooksPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

// Query 설정
const queryConfig = pluginQuery.configs["flat/recommended"];

export default [...queryConfig, baseConfig, typescriptConfig, reactConfig];
