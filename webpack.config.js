/**@type {import('webpack').Configuration} */

var config = {
    mode: 'development',
    entry: './src/ts/main.ts',

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.ts']
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[contenthash].js'
    }
}

module.exports = config