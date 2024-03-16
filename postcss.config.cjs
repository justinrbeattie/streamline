const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');


module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-jit-props':postcssJitProps(OpenProps),
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
