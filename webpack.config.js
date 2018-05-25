module.exports = {
    entry: {
        login: './src/index.js',
        admin_dashboard: './src/AdminDashboard.js',
        dashboard: './src/StudentDashboard.js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    output: {
        // filename: 'bundle.js',
        path: __dirname + '/public'
    }
}