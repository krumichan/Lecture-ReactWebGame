const path = require('path');  // node의 path library.
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 파일을 하나로 합쳐주기 위한 webpack 설정.
module.exports = {
    name: 'work-relay-setting' // webpack 모듈의 이름.
    , mode: 'development' // service 배포의 경우 ⇒ mode: production.
    , devtool: 'eval'
    , resolve: {
        extensions: ['.js', '.jsx']
    }

    // 입력
    , entry: {
        // app에서 확장자를 생략할 수 있는 이유는 위의 resolve.extensions에 정의했기 때문이다.
        // 본래라면 'client'가 아닌 'client.jsx'와 같은 형식으로 써야한다.
        app: [
            './client'
            // cilent.jsx에서 WordRelay.jsx를 불러오고 있기 때문에 밑의 내용을 생략..
            // , 'wordReplay/WordRelay.jsx'
        ]
    }

    // entry에 module 적용.
    ,module: {
        rules: [
            {
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
                    , plugins: [
                        '@babel/plugin-proposal-class-properties'
                        , 'react-refresh/babel'
                    ]
                }
            }
        ]
    }

    , plugins: [
        // # npm run dev
        // 위의 명령어로 실행해야 한다.
        // # npx webpack
        // 위의 명령어는 배포 명령어이기 때문에,
        // TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received undefined
        // 위와 같은 에러가 발생한다.
        // 배포시에는 아래의 코드를 주석 처리 해야한다.
        new RefreshWebpackPlugin()
        ,
    ]

    // 출력
    , output: {
        // path는 absolute path이다.
        path: path.join(__dirname, 'core') // __dirname : current directory. ( 여기서는 webpackWordRelay directory absolute path )
        , filename: 'app.js'

        // publicPath는 relative path이다. ( 가상 경로 )
        , publicPath: '/core/'
    }

    /**
     * build 결과물을 아래 publicPath를 메모리로 저장해 두는데,
     * devServer는 소스 등의 변경을 감지하여,
     * 그에 따라 저장한 결과물을 자동으로 수정해준다.
     */
    , devServer: {
        publicPath: '/core/'
        , hot: true
    }
}