/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        custom_light_green: '#76E9D6',
        custom_purple: '#C29DFF',
        custom_gray: '#787878',
        custom_green: '#8CFF82',
        custom_orange: '#FF9580',
      },
      backgroundImage: {
        inicio: "url('public/img/bg_inicio.png')",
        acertijo: "url('public/img/bg_acertijo.png')",
        info: "url('public/img/bg_info.png')",
      },
    },
  },
  plugins: [],
};
