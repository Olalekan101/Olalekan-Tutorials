/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['media.giphy.com','drive.google.com','www.flaticon.com','cdn-icons-png.flaticon.com'],
  },
webpack(config){
  config.module.rules.push({
    test: /\.svg$/,
  use: [{loader: '@svgr/webpack', options:{icon:true}}],
  })
  return config
}
  // images: {
  //   // domains: ['media.giphy.com','drive.google.com'],
  //   domains: ['drive.google.com']
  // },
}

module.exports = nextConfig
