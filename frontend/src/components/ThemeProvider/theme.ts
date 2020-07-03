import { createGlobalStyle } from "styled-components";

const colors = {
    white: '#FFF',
    black: '#000',
    darkBlue: '#232b34',
    lightGrey: '#f7f8fa',
    darkGrey: '#4e4e4e',
    orange: '#ff9577',
    red: '#d0021b',
}

export const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    #root {
        height: 100%;
        min-height: 100vh;
        background-color: ${colors.darkBlue};
        overflow-y: auto;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        display: inline-block;
        border: none;
        padding: 1rem 2rem;
        margin: 0;
        text-decoration: none;
        background: #0069ed;
        color: #ffffff;
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    button:hover,
    button:focus {
        outline: none;
        box-shadow: none;
    }

    button:active {
        transform: scale(0.99);
    }
`;


const theme = {
    colors
};

export default theme;
