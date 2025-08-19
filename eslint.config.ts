import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			react: react,
			'react-refresh': reactRefresh,
			'react-hooks': reactHooks,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/prefer-stateless-function': 'error',
			'react/button-has-type': 'error',
			'react/no-unused-prop-types': 'error',
			'react/jsx-pascal-case': 'error',
			'react/jsx-no-script-url': 'error',
			'react/no-children-prop': 'error',
			'react/no-danger': 'error',
			'react/no-danger-with-children': 'error',
			'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
			'react/jsx-fragments': 'error',
			'react/destructuring-assignment': [
				'error',
				'always',
				{ destructureInSignature: 'always' },
			],
			'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
			'react/jsx-max-depth': ['error', { max: 5 }],
			'react/function-component-definition': [
				'warn',
				{ namedComponents: 'arrow-function' },
			],
			'react/jsx-key': [
				'error',
				{
					checkFragmentShorthand: true,
					checkKeyMustBeforeSpread: true,
					warnOnDuplicates: true,
				},
			],
			'react/jsx-no-useless-fragment': 'warn',
			'react/jsx-curly-brace-presence': 'warn',
			'react/no-typos': 'warn',
			'react/display-name': 'warn',
			'react/self-closing-comp': 'warn',
			'react/jsx-sort-props': 'warn',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-one-expression-per-line': 'off',
			'react/prop-types': 'off',
		},
	}
);
