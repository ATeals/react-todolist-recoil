import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        background-color : ${(props) => props.theme.color.background};
        color : ${(props) => props.theme.text};

        max-width: 480px;
        margin: 0 auto;
    }
`;
