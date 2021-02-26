module.exports = {
	root: true,
	extends: [
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true
	},
	globals: {
		browser: true,
		context: true,
		page: true
	},
	plugins: ['jest', 'react-hooks'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		ecmaFeatures: {
			legacyDecorators: true,
			jsx: true
		}
	},
	rules: {
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'space-before-function-paren': 0,
		'import/export': 0,
		'import/no-extraneous-dependencies': ['error'],
		'no-use-before-define': ['error', { functions: true, classes: true }],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': [
			'warn',
			{
				additionalHooks: 'useRecoilCallback'
			}
		],
		'react/prop-types': 2,
		'react/jsx-handler-names': 0,
		'react/jsx-fragments': 0,
		'react/no-unused-prop-types': 0
	}
};
