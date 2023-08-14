const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = function override(config, env) {
  // Add CSP directives to the existing HtmlWebpackPlugin configuration
  config.plugins[0].options = Object.assign({}, config.plugins[0].options, {
    contentSecurityPolicy: {
      'default-src': "'none'",
      'font-src': "'self' https://fonts.gstatic.com",
      // Add more directives as needed
    },
  });

  // Add CSP plugin to the plugins array
  config.plugins.push(
    new CspHtmlWebpackPlugin(
      {
        'default-src': "'none'",
        'font-src': "'self' https://fonts.gstatic.com",
        // Add more directives as needed
      },
      {
        enabled: true, // Enable the CSP plugin
        hashingMethod: 'sha256',
        hashEnabled: {
          'script-src': true, // You might need to specify script-src as well
        },
      }
    )
  );

  return config;
};
