const path = require('path')

module.exports = {
    mode: 'development',
    target: 'web', 
    entry: {
        bundle: ['./src/index.js', './src/frame2.js', './src/firebase.js', './src/script.js']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    watch: true
};