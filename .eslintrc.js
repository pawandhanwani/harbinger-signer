module.exports = {
    root: true,

    parser: '@typescript-eslint/parser', // Make ESLint compatible with TypeScript
    parserOptions: {
        // Enable linting rules with type information from our tsconfig
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],

        sourceType: 'module', // Allow the use of imports / ES modules

        ecmaFeatures: {
            impliedStrict: true, // Enable global strict mode
        },
    },

    // Specify global variables that are predefined
    env: {
        browser: true, // Enable browser global variables
        node: true, // Enable node global variables & Node.js scoping
        es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
        mocha: true, // Add Mocha testing global variables
    },

    plugins: [
        '@typescript-eslint', // Add some TypeScript specific rules, and disable rules covered by the typechecker
        'import', // Add rules that help validate proper imports
        'mocha', // Add rules for writing better Mocha tests
        'prettier', // Allows running prettier as an ESLint rule, and reporting differences as individual linting issues
    ],

    extends: [
        // ESLint recommended rules
        'eslint:recommended',

        // Add TypeScript-specific rules, and disable rules covered by typechecker
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',

        // Add rules for import/export syntax
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',

        // Add Airbnb + TypeScript support
        'airbnb-base',
        'airbnb-typescript/base',

        // Add rules that specifically require type information using our tsconfig
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // Enable Prettier for ESLint --fix, and disable rules that conflict with Prettier
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],

    rules: {
        // Allow logging
        'no-console': 'off',

        // https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': [
            'warn',
            {
                allow: [],
                allowAfterThis: false,
                allowAfterSuper: false,
                allowAfterThisConstructor: false,
                enforceInMethodNames: true,
            },
        ],
    },

    overrides: [
        // Overrides for all test files
        {
            files: 'test/**/*.ts',
            rules: {
                // For our Mocha test files, the pattern has been to have unnamed functions
                'func-names': 'off',
                // Using non-null assertions (obj!.property) cancels the benefits of the strict null-checking mode, but these are test files, so we don't care.
                '@typescript-eslint/no-non-null-assertion': 'off',
                // For some test files, we shadow testing constants with function parameter names
                'no-shadow': 'off',
                // Some of our test files declare helper classes with errors
                'max-classes-per-file': 'off',
            },
        },
        {
            files: '**/*.ts',
            rules: {
                // Allow unused variables in our files when explicitly prepended with `_`.
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    { argsIgnorePattern: '^_' },
                ],
            },
        },
    ],
} 