module.exports = {
  // testEnvironment: "jsdom",
  "transform": {
    "\\.[jt]sx?$": ["babel-jest", { "configFile": "./babel.jest.config.js" }]
   
  },
}
