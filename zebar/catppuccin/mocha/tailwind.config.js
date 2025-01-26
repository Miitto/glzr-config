/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			data: {
				vertical: 'dir="vertical"',
				horizontal: 'dir="horizontal'
			}
		}
	},

  plugins: [require("@catppuccin/tailwindcss")({defaultFlavour: "mocha"})],
}

