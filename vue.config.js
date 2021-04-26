module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/style/styles.scss"`,
            },
        },
    },



    configureWebpack: {
        module: {
            rules: [
                // ... other rules omitted

                // this will apply to both plain `.scss` files
                // AND `<style lang="scss">` blocks in `.vue` files
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    },

    devServer: {
        port: 80
    }
}
