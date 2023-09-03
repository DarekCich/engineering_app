
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    config.module.rules.push({
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader' // Dodaj odpowiedni loader, na przykład babel-loader
      },
    });
    return config;
  }
};
