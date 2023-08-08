import { styled } from "styled-components";

export const Container = styled.div`
    margin: 10px 20px;

    & > h1 {
        font-size: 2em;
        font-weight: 600;
    }

    & > * {
        margin: 30px 0;
    }
`;
