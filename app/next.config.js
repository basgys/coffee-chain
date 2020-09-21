const path = require('path')

// Initial config
let config = {
  webpack: (config, { buildId, dev }) => {
		config.resolve = {
      ...config.resolve,
			alias: {
        ...config.resolve.alias,
				'~': path.resolve(__dirname),
			},
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    }
    config.plugins = config.plugins || []
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
	publicRuntimeConfig: {
		// Will be available on both server and client
    WEB3_ENDPOINT: process.env.WEB3_ENDPOINT || "http://127.0.0.1:7545",
    MAP_API_KEY: process.env.MAP_API_KEY
	}
}

// SASS
const withSass = require("@zeit/next-sass");
config = Object.assign({}, config, withSass({
  cssModules: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      enforce: "pre",
      test: /.scss$/,
      loader: "sass-resources-loader",
      options: {
        resources: [
          './taxonomy/index.scss',
          './assets/**/*.scss',
          './layouts/**/*.scss',
          './components/**/*.scss',
          './templates/**/*.scss'
        ]
      }
    });
    return config;
  }
}));

module.exports = config