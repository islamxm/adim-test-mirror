import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      // "@typescript-eslint/no-unused-vars": [
      //   "warn",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_",
      //   },
      // ],
      "@typescript-eslint/no-unused-vars": "off",

      "react-hooks/set-state-in-effect": "off",

      "@next/next/no-img-element": "off",

      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclarator[id.name!=/Schema$/][init.callee.object.name='z']",
          message: "Zod-схемы должны иметь суффикс 'Schema' (например, userSchema).",
        },
      ],
    },
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
