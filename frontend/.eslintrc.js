module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	plugins: ['prettier'],
	rules: {
		indent: ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'no-unused-vars': 'warn',
		'no-console': 'off',
		'prettier/prettier': [
			'error',
			{
				tabWidth: 4,
				useTabs: true,
				endOfLine: 'auto',
				singleQuote: true,
				arrowParens: 'always',
			},
		],
	},
};
