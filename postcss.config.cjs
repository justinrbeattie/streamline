
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import':{},
    '@csstools/postcss-light-dark-function':{},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    "css-has-pseudo": {},
    "@csstools/postcss-oklab-function":{},
  },
}
