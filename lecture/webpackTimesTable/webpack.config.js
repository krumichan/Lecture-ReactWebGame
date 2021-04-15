const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development'
    , devtool: 'eval' // hidden-source-map
    , resolve: {
        extensions: ['.jsx', '.js']
    }


    , entry: {
        app: './client'
        ,
    }

    , module: {
        rules: [{
            test: /\.jsx?$/
            , loader: 'babel-loader'
            , options: {
                // plugin의 모임이 preset.
                presets: [
                    // 참고 URL : https://github.com/browserslist/browserslist#queries
                    ['@babel/preset-env', {
                        targets: {
                            // > 5% in KR : 한국에서 점유율이 5% 이상인 browser 지원.
                            browsers: ['> 5% in KR', 'last 2 chrome versions']
                            ,
                        }
                        , debug: true // babel을 deugging mode로 실행.
                    }]
                    , '@babel/preset-react'
                ]
                , plugins: []
            }
        }]
    }

    , plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
        ,
    ]

    , output: {
        path: path.join(__dirname, 'core')
        , filename: 'app.js'
        ,
    }
}