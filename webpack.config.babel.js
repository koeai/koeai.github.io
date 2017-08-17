import { DefinePlugin, optimize, HotModuleReplacementPlugin } from 'webpack';
import libpath from 'path';

const { UglifyJsPlugin, AggressiveMergingPlugin } = optimize;
const target = '';
const dst = libpath.join('./', target);
let { env: { NODE_ENV, WATCH } } = process;

if (!NODE_ENV) {
	NODE_ENV = 'production';
}

WATCH = WATCH === 'true';

const isProduction = NODE_ENV === 'production';
const presets = [];
const plugins = [
	new DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(NODE_ENV)
		}
	})
];

if (isProduction) {
	presets.push('es2015');
	plugins.push(
		new UglifyJsPlugin({ compress: { warnings: false }, mangle: true }),
		new AggressiveMergingPlugin()
	);
}

const context = libpath.join(__dirname, 'src', target);

const config = {
	entry: context,
	output: {
		path: libpath.join(__dirname, dst),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets,
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js']
	},
	plugins
};

if (WATCH) {
	Object.assign(config, {
		entry: [
			'webpack-dev-server/client?http://0.0.0.0:3000',
			'webpack/hot/only-dev-server',
			context
		],
		devServer: {
			hot: true,
			contentBase: dst,
			port: 3000,
			host: '0.0.0.0',
			inline: true
		}
	});

	config.plugins.push(new HotModuleReplacementPlugin());
}

export default config;