const {injectBabelPlugin} = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env){
    config = injectBabelPlugin(
        [
            'import',
            {libraryName: 'antd', libraryDirectory: 'lib', style: 'css'}
        ],
        config
    );

    //sass style
    const rule_sass = {
        test: /(\.sass|\.scss)/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    };

    //typescript file
    const rule_ts = {
        test: /\.ts$/,
        use: 'ts-loader'
    };

    config.module['rules'].push(rule_sass);
    config.module['rules'].push(rule_ts);

    config.resolve.alias = {
        _asset: path.resolve(__dirname, 'src/asset/'),
        _conf: path.resolve(__dirname, 'src/conf/'),
        _util: path.resolve(__dirname, 'src/util/'),
        _common: path.resolve(__dirname, 'src/view/common/'),
        _layout: path.join(__dirname, 'src/view/layout/'),
        _page: path.resolve(__dirname, 'src/view/page/')
    };

    return config;
};
