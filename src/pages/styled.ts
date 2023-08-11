import { styled } from "styled-components";

export const Container = styled.div`
    background-color: ${(props) => props.theme.color.background};
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
`;

export const Gred = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;
