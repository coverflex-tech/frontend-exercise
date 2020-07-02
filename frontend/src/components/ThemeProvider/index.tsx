import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './theme';

const Provider: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}

export default Provider;