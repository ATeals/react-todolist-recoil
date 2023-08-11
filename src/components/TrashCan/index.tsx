import { Droppable } from "react-beautiful-dnd";

const TrashCan = () => {
    return (
        <Droppable
            droppableId={"TRASH"}
            type="BOARD"
        >
            {(magic) => (
                <div
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                >
                    <h1>{"쓰레기통"}</h1>

                    {magic.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TrashCan;
