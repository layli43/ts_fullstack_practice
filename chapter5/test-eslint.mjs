// Simple test ESLint config to check basic functionality
export default [
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'warn',
        },
    },
];
