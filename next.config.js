const path = require('path')
const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

const plugins = [[withCSS], [withSass({
  cssLoaderOptions: {
    importLoaders: 2
  }
})]]

/* CONFIGURATION */
const NextAppConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    // staticFolder: '/static',
    APP_NAME: 'Pro Next',
    API_DEVELOPMENT: 'http://localhost:1337',
    API_PRODUCTION: 'http://production.com',
    PRODUCTION: false,
  },
  cssLoaderOptions: {
    url: false,
  },
  webpack: (config) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['public'] = path.join(__dirname, 'public')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')

    return config
  },
  //for the image optimization
  images: {
    path: 'http://localhost:1337/uploads/',
  },
}

/* EXPORT DECLARATION */
module.exports = withPlugins(plugins, NextAppConfig)
