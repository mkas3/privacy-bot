export default {
  '*': 'eslint --flag unstable_ts_config --fix',
  '*.{ts,tsx}': () => 'tsc --noEmit'
};
