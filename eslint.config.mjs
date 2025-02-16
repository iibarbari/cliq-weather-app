import { dirname } from "path";
import pluginJSXA11Y from "eslint-plugin-jsx-a11y";
import { fileURLToPath } from "url";
import globals from "globals";
import pluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import { FlatCompat } from "@eslint/eslintrc";
import pluginTypescriptSortKeys from "eslint-plugin-typescript-sort-keys";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,ts,tsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
    },
    {
        rules: {
            "arrow-parens": "error",
            "eol-last": ["error"],
            eqeqeq: ["error"],
            "max-len": ["error", { code: 140, ignoreStrings: true }],
            "no-console": "error",
            "no-useless-return": ["error"],
            "object-curly-newline": ["error", { consistent: true }],
            "object-curly-spacing": ["error", "always"],
            "object-shorthand": ["error"],
            "prefer-destructuring": ["error"],
            "quote-props": ["error", "as-needed"],
            quotes: ["error", "double", { allowTemplateLiterals: true }],
            "react/jsx-closing-bracket-location": ["error"],
            "react/jsx-first-prop-new-line": ["error", "multiline"],
            "react/jsx-key": ["error", { checkFragmentShorthand: true }],
            "react/jsx-max-props-per-line": ["error", { when: "multiline" }],
            "react/jsx-no-target-blank": 0,
            "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
            "react/jsx-sort-props": "error",
            "react/jsx-tag-spacing": "error",
            "react/jsx-wrap-multilines": ["error"],
            "react/no-array-index-key": ["error"],
            "react/react-in-jsx-scope": "off",
            "sort-keys": "error",
        },
    },
    {
        plugins: {
            "jsx-a11y": pluginJSXA11Y,
        },
        rules: {
            ...pluginJSXA11Y.flatConfigs.recommended.rules,
        },
    },
    {
        plugins: {
            "sort-destructure-keys": pluginSortDestructureKeys,
        },
        rules: {
            "sort-destructure-keys/sort-destructure-keys": ["error"],
        },
    },

    {
        plugins: {
            "typescript-sort-keys": pluginTypescriptSortKeys,
        },
        rules: {
            "typescript-sort-keys/interface": "error",
            "typescript-sort-keys/string-enum": "error",
        },
    },

];

export default eslintConfig;
