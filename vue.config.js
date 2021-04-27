const fs = require('fs')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    https: true,
    public:'https://localhost:8080/',
    clientLogLevel: 'silent',
    proxy: 'http://localhost:4000'
  },
}


// {
  
//   keys: fs.readFileSync("./certs/key.pem"),
//   cert: fs.readFileSync("./certs/cert.pem"),
// },
