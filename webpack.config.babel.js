const path = require('path');

const config = {
    entry: ['./src/index.js'],
    output: {
          filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]

    },

};

export default config;