/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client.
    // DON'T PUT SECRETS HERE
    API_URL: process.env.NODE_ENV === 'development' ? process.env.API_URL_DEV : process.env.API_URL_PROD,
  },
}

module.exports = nextConfig
