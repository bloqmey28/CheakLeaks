
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    900: '#050510', // Deep background
                    800: '#0a0a20', // Card background
                    700: '#1a1a40', // Border/Hover
                    500: '#00f0ff', // Cyan Neon
                    400: '#00ff9d', // Green Neon
                    error: '#ff003c', // Red Neon
                },
            },
            fontFamily: {
                mono: ['"Courier New"', 'monospace'], // Hacker feel
            },
        },
    },
    plugins: [],
}
