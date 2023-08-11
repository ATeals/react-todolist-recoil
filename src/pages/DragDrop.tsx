import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;

    height: 100vh;
    background-color: ${(props) => props.theme.color.background};
`;

const Gred = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.color.boardColor};
    border-radius: 5px;
    min-height: 300px;
`;

interface CardProps {
    $isComplete: boolean;
}

const Card = styled.div<CardProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.$isComplete ? props.theme.color.boardColor : props.theme.color.cardColor)};
    text-decoration: ${(props) => (props.$isComplete ? "line-through" : "none")};
`;

interface Todoitem {
    id: string;
    content: string;
    isComplete: boolean;
    category: string;
}

interface CategoryState {
    title: string;
    index: number;
    todos: Todoitem[];
}

interface Category extends CategoryState {
    todos: Todoitem[];
}

interface C {
    [key: string]: CategoryState;
}

const category = atom<C>({
    key: "CATEGORYSTATEasd",
    default: {
        "1": {
            index: 0,
            title: "TODO",
            todos: [
                { id: "1", content: "a", isComplete: false, category: "1" },
                { id: "2", content: "b", isComplete: false, category: "1" },
                { id: "3", content: "c", isComplete: false, category: "1" },
            ],
        },
        "2": {
            index: 1,
            title: "DOING",
            todos: [
                { id: "4", content: "d", isComplete: false, category: "2" },
                { id: "5", content: "e", isComplete: false, category: "2" },
            ],
        },
        "3": {
            index: 2,
            title: "DONE",
            todos: [
                { id: "6", content: "f", isComplete: false, category: "3" },
                { id: "7", content: "f", isComplete: false, category: "3" },
                { id: "8", content: "f", isComplete: false, category: "3" },
            ],
        },
    },
});

const DD = () => {
    const [categorys, setCategorys] = useRecoilState(category);

    const { handleSubmit, register } = useForm();

    // const categorys = useRecoilValue(getCategory);

    const onValid = ({ content }: any) => {
        console.log(content);
        console.log("전송", content);

        setCategorys((categorys) => ({ ...categorys, [String(Date.now())]: { title: content, index: Object.keys(categorys).length, todos: [] } }));
    };

    console.log(categorys);

    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;

        if (!destination) return;

        setCategorys((allCategorys) => {
            console.log(allCategorys);
            const sourceBoard = [...allCategorys[source.droppableId].todos];
            const targetBoard = [...allCategorys[destination.droppableId].todos];
            let [removedItem] = sourceBoard.splice(source.index, 1);
            removedItem = { ...removedItem, category: destination.droppableId };

            if (destination.droppableId === source.droppableId) {
                sourceBoard.splice(destination.index, 0, removedItem);
                return {
                    ...allCategorys,
                    [source.droppableId]: { ...allCategorys[source.droppableId], todos: sourceBoard },
                };
            } else {
                targetBoard.splice(destination.index, 0, removedItem);
                return {
                    ...allCategorys,
                    [source.droppableId]: { ...allCategorys[source.droppableId], todos: sourceBoard },
                    [destination.droppableId]: { ...allCategorys[destination.droppableId], todos: targetBoard },
                };
            }
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    type="text"
                    placeholder="todo?"
                    {...register("content")}
                />
                <button>ADD</button>
            </form>
            <Wrapper>
                <Gred>
                    {Object.keys(categorys).map((id) => (
                        <Boards
                            category={categorys[id]}
                            key={id}
                            id={id}
                        />
                    ))}
                </Gred>
            </Wrapper>
        </DragDropContext>
    );
};

const Boards = ({ category: { todos, title }, id }: { category: Category; id: string }) => {
    return (
        <Droppable droppableId={id}>
            {(magic) => (
                <Board
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                >
                    <h1>{title}</h1>

                    {todos.map((todo, index) => (
                        <DragabbleCard
                            todo={todo}
                            index={index}
                            key={todo.id}
                        />
                    ))}

                    {magic.placeholder}
                </Board>
            )}
        </Droppable>
    );
};

const DragabbleCard = React.memo(({ todo, index }: { todo: Todoitem; index: number }) => {
    const setCategory = useSetRecoilState(category);
    return (
        <Draggable
            draggableId={todo.id}
            index={index}
        >
            {(magic) => (
                <Card
                    $isComplete={todo.isComplete}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <span>{todo.content}</span>
                    <div
                        onClick={() => {
                            console.log(todo);
                            setCategory((category) => {
                                const copy = [...category[todo.category].todos];
                                copy[copy.findIndex((i) => i.id === todo.id)] = { ...copy[copy.findIndex((i) => i.id === todo.id)], isComplete: !todo.isComplete };
                                return { ...category, [todo.category]: { ...category[todo.category], todos: copy } };
                            });
                        }}
                    >
                        ✅
                    </div>
                </Card>
            )}
        </Draggable>
    );
});

export default DD;
