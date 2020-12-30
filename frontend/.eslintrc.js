module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	plugins: ['prettier'],
	rules: {
		indent: ['error', 'tab'],
		'import/prefer-default-export': ['off'],
		'import/no-cycle': ['off'],
		'react/prop-types': ['off'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
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
