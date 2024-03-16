const OpenProps = require('open-props');


module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    "css-has-pseudo": {},
    "@csstools/postcss-oklab-function":{},
    'postcss-jit-props': { ...OpenProps },
  },
}
