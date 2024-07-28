/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		// Ignore HTML files from node-pre-gyp
		config.module.rules.push({
			test: /\.html$/,
			use: 'ignore-loader',
		});

		return config;
	},
};

export default nextConfig;
