import { eslint } from '@mkas3/eslint';

export default eslint({
  exports: true,
  imports: true,
  jsonc: false,
  jsxA11y: true,
  next: false,
  react: false,
  stylistic: true,
  tailwind: false
}, {
  rules: {
    'antfu/no-top-level-await': 'off',
    'no-console': 'warn'
  }
});
