import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  
  --color-primary-bg: #121212;

  --color-secondary-1: #191919;
  --color-secondary-2: #151515;

  /* Gray */
  --color-gray-400: #BDBDBD;
  --color-gray-600: #757575;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #EFEFEF;
  --color-grey-150: #e0e1e2;
  --color-grey-200: #d6d6d6;
  --color-grey-300: #adadad;
  --color-grey-400: #707070;
  --color-grey-500: #474747;
  --color-grey-600: #333333;
  --color-grey-700: #292929;
  --color-grey-800: #1f1f1f;
  --color-grey-900: #141414;


  /* Orange */

  --color-orange-400: #ffae1a;
  --color-orange-500: #FFA500;

  /* Blue */

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;

  --color-deep-blue-800: #0000FF; 
  
  --color-blue-green-600: #21B6A8;

  --color-blue-cyan-500: #396f80;
  --color-blue-cyan-700: #22434c;

  /* Green */

  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-green-500: #228b22; 
  --color-green-200: #449964;

  --color-grass-green-300: #57b000;

  /* Yellow */
  
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;

  --color-citrine-yellow-500: #E4D00A;

  /* Grey */

  --color-platinum-200: #E5E4E2;

  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  
  /* Purple */

  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  /* Red */

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-750: #a71919;
  --color-red-800: #991b1b;
  --color-red-primary-800: #5d0e0e;


  /* Pink */
  --color-pink-300: #FB70BC;
  --color-pink-500: #E151AF;


  --backdrop-color: rgba(18, 18, 18, 0.4);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-md: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.44);
  
  --border-radius-tiny: 4px;
  --border-radius-sm: 6px;
  --border-radius-md: 8px;
  --border-radius-lg: 10px;
  
}

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
    color: var(--color-grey-700);

    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
    font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
  }

  input{
    font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
  }

  textarea{
    font-family: "Rubik", "Roboto Flex", sans-serif, system-ui, -apple-system, 'Segoe UI', Arial;
  }

  *:disabled {
    cursor: not-allowed;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-deep-blue-800);
    outline-offset: -1px;
  }

  img {
    max-width: 100%;
  }
  
  ::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: var(--color-primary-bg);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: var(--color-red-primary-800);
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary-700);
	}

	* {
		scrollbar-width: thin;
		scrollbar-color: var(--color-red-primary-800) var(--color-primary-bg);
	}
`;

export default GlobalStyles;
