const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      faviconSVG: "favicon.svg",
    },
  },
});
