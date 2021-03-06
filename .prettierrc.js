module.exports = {
  arrowParens: 'always',
  trailingComma: 'all',
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  tabWidth: 4,
  parser: 'typescript',
  printWidth: 120,
  overrides: [
    {
      files: '*.json',
      options: { parser: 'json' },
    },
  ],
};
