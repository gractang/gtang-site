const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("theme.js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });
  eleventyConfig.addCollection("writing", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("writing/*.html")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      includes: "_includes",
      output: "_site",
    },
  };
};
