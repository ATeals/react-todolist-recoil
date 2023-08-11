import { Droppable } from "react-beautiful-dnd";
import { DragabbleCard } from "@/components/Card";
import { CategoryState } from "@/recoil/atom/category";
import { Todolist } from "./styled";

const Boards = ({ category: { todos }, id }: { category: CategoryState; id: string }) => {
    return (
        <Droppable
            droppableId={id}
            type="BOARD"
        >
            {(provider) => (
                <Todolist
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    {todos.map((todo, index) => (
                        <DragabbleCard
                            todo={todo}
                            index={index}
                            key={todo.id}
                        />
                    ))}

                    {provider.placeholder}
                </Todolist>
            )}
        </Droppable>
    );
};

export default Boards;
