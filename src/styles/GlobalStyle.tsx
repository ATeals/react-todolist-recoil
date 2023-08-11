import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
        background-color : ${(props) => props.theme.color.background};
        color : ${(props) => props.theme.text};

        padding : 20px
    }
`;
