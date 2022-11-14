module.exports = {
  // testEnvironment: "jsdom",
  "transform": {
    "\\.[jt]sx?$": ["babel-jest", { "configFile": "./babel.jest.config.js" }]
   
  },
  globalSetup:"./setup.jest.js",
  globalTeardown:"./teardown.jest.js",
  modulePaths:["<rootDir>"]
  // moduleDirectories:['.',"../../node_modules"]
}
