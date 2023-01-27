// eslint-disable-next-line @typescript-eslint/no-var-requires
const typescript = require("rollup-plugin-typescript2");

module.exports = {
  input: ["src/index.ts"],
  output: [
    {
      dir: "dist",
      entryFileNames: "[name].js",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [typescript()],
};
