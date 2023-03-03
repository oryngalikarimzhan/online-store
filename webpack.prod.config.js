module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};
