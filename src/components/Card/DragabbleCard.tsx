import React from "react";
import { Draggable } from "react-beautiful-dnd";

import useEditTyping from "@/hooks/useEditTyping";
import useTodos from "@/hooks/useTodos";

import { Todoitem } from "@/recoil/atom/category";
import { Card } from "./styled";

const DragabbleCard = React.memo(({ todo, index }: { todo: Todoitem; index: number }) => {
    const { completeTodo, editTodoText } = useTodos();

    const [typing, setTyping] = useEditTyping(todo.content, () => {
        editTodoText(todo, typing);
    });

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
                    <span>:::</span>
                    <input
                        onChange={(e) => {
                            setTyping(e.currentTarget.value);
                        }}
                        value={typing}
                        disabled={todo.isComplete}
                    ></input>

                    <div
                        onClick={() => {
                            console.log(todo);
                            completeTodo(todo);
                        }}
                    >
                        {todo.isComplete ? "✍️" : "✅"}
                    </div>
                </Card>
            )}
        </Draggable>
    );
});

export default DragabbleCard;
