const postcssJitProps = require('postcss-jit-props');
const path = require('path');


module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-jit-props': postcssJitProps({
      files: [
        path.resolve(__dirname, 'node_modules/open-props/open-props.min.css'),
      ],
    }),
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    "css-has-pseudo": {},
    "@csstools/postcss-oklab-function":{}
  },
}
