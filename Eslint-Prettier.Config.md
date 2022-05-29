# VSCode - ESLint, Prettier & Airbnb Setup for Node.js Projects

### 1. Install ESLint & Prettier extensions for VSCode

Optional - Set format on save and any global prettier options

### 2. Install Packages

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base eslint-plugin-node eslint-config-node
```

### 3. Create .prettierrc for any prettier rules (semicolons, quotes, etc)

```
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

### 4. Create .eslintrc.json file (You can generate with npx eslint --init)

```
{
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb-base", "prettier", "plugin:node/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-plusplus": "off",
    "no-process-exit": "off",
    "class-methods-use-this": "off"
  }
}
```

### Reference

- ESLint Rules - https://eslint.org/docs/rules/
- Prettier Options - https://prettier.io/docs/en/options.html
- Airbnb Style Guide - https://github.com/airbnb/javascript
