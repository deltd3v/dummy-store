// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [
    /* ... */
    "@snowpack/plugin-sass",
    "@snowpack/plugin-dotenv",
   
  //  '@snowpack/plugin-react-refresh'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 3000,
    hmrPort: 1234,
    open: "firefox",
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
