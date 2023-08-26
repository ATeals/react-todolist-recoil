import List from "@/components/Board/Board";
import { CategoryForm } from "@/components/Form";
import TrashCan from "@/components/TrashCan";
import useTodos from "@/hooks/useTodos";

import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { Container } from "./styled";
import { styled } from "styled-components";

const DragDrop = () => {
    const { categoryArray, removeTodo, changeTodoLocation, deleteCategory, changeCategoryLocation } = useTodos();

    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;

        if (info.type === "KANBAN") return changeCategoryLocation(source, destination);

        if (destination?.droppableId === "TRASH") removeTodo(source);

        changeTodoLocation(source, destination);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <CategoryForm />
            <Droppable
                droppableId="KANBAN"
                type="KANBAN"
                direction="horizontal"
            >
                {(provider) => (
                    <Container
                        ref={provider.innerRef}
                        {...provider.droppableProps}
                    >
                        {categoryArray.map((category) => (
                            <Draggable
                                key={category.title}
                                index={category.index}
                                draggableId={category.title}
                            >
                                {(provider) => (
                                    <Board
                                        ref={provider.innerRef}
                                        {...provider.dragHandleProps}
                                        {...provider.draggableProps}
                                    >
                                        <Title>
                                            <h1>{category.title}</h1>
                                            <div
                                                onClick={() => {
                                                    deleteCategory(category);
                                                }}
                                            >
                                                ❌
                                            </div>
                                        </Title>

                                        <List
                                            category={category}
                                            key={category.title}
                                            id={category.id}
                                        />
                                    </Board>
                                )}
                            </Draggable>
                        ))}
                        {provider.placeholder}
                    </Container>
                )}
            </Droppable>
            <TrashCan />
        </DragDropContext>
    );
};

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`;

const Board = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin: 5px;
    background-color: ${(props) => props.theme.color.boardColor};
    max-height: 400px;
    min-width: 150px;
    overflow: scroll;
`;

export default DragDrop;
