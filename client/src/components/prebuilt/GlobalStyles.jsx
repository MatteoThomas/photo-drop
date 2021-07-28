import { Global, css } from "@emotion/core";

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
      `}
    />
    <Global
      styles={css`
        input,
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border-style: none;
        }
      `}
    />
    <Global
      styles={css`
        body,
        html {
          color: #333
          font-size: 18px;
          font-family: Helvetica, Arial, sans-serif;
          padding-top: 40px;
        }
      `}
    />
  </>
);

export default GlobalStyles;
