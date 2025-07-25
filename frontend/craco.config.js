module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const sourceMapLoader = webpackConfig.module.rules.find(
        (rule) =>
          rule.enforce === "pre" &&
          rule.use &&
          rule.use.some(
            (use) => use.loader && use.loader.includes("source-map-loader"),
          ),
      );

      if (sourceMapLoader) {
        sourceMapLoader.exclude = /stylis-plugin-rtl/;
      }

      return webpackConfig;
    },
  },
};
