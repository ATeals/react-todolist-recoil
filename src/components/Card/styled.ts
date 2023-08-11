import { styled } from "styled-components";

interface CardProps {
    $isComplete: boolean;
}

export const Card = styled.div<CardProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;

    background-color: ${(props) => (props.$isComplete ? props.theme.color.boardColor : props.theme.color.cardColor)};
    input {
        background-color: inherit;
        border: none;
        width: 100%;
        margin-right: 10px;
        padding: 10px 10px;
        font-size: 1rem;
        text-decoration: ${(props) => (props.$isComplete ? "line-through" : "none")};
    }

    span {
        margin-right: 10px;
    }
`;
