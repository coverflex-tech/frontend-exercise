const fs = require('fs');

const PORT = process.env.PORT || 8080;
const API_URL = 'http://localhost:4000';

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./localhost_https/key.pem'),
      cert: fs.readFileSync('./localhost_https/cert.pem'),
      ca: fs.readFileSync('./localhost_https/minica.pem'),
    },
    port: PORT,
    public: `0.0.0.0:${PORT}`,
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    proxy: {
      '/api': {
        target: API_URL,
        ws: true,
        changeOrigin: true,
      },
    },
    // writeToDisk: true, // to allow the copy-webpack-plugin to copy the files
  },
};
