const path = require('path');  // node의 path library.

// 파일을 하나로 합쳐주기 위한 webpack 설정.
module.exports = {
    name: 'work-relay-setting' // webpack 모듈의 이름.
    , mode: 'development' // service: production.
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
                    , plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        ]
    }

    , plugins: [

    ]

    // 출력
    , output: {
        path: path.join(__dirname, 'core') // __dirname : current directory. ( 여기서는 webpackWordRelay directory absolute path )
        , filename: 'app.js'
    }
}