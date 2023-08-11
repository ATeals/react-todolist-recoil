import { categoryArrayState } from "@/recoil";
import categoryState, { CategoryState, Todoitem } from "@/recoil/atom/category";
import { DraggableLocation } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";

const useTodos = () => {
    const [categorys, setCategorys] = useRecoilState(categoryState);
    const categoryArray = useRecoilValue(categoryArrayState);

    const id = String(Date.now());

    const addCategory = (content: string) => setCategorys((categorys) => ({ ...categorys, [id]: { id, title: content, index: Object.keys(categorys).length, todos: [] } }));

    const removeTodo = (source: DraggableLocation) =>
        setCategorys((allCategorys) => {
            const sourceBoard = [...allCategorys[source.droppableId].todos];
            sourceBoard.splice(source.index, 1);
            return {
                ...allCategorys,
                [source.droppableId]: { ...allCategorys[source.droppableId], todos: sourceBoard },
            };
        });

    const changeTodoLocation = (source: DraggableLocation, destination: DraggableLocation) =>
        setCategorys((allCategorys) => {
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

    const completeTodo = (todo: Todoitem) =>
        setCategorys((category) => {
            const copy = [...category[todo.category].todos];
            copy[copy.findIndex((i) => i.id === todo.id)] = { ...copy[copy.findIndex((i) => i.id === todo.id)], isComplete: !todo.isComplete };
            return { ...category, [todo.category]: { ...category[todo.category], todos: copy } };
        });

    const editTodoText = (todo: Todoitem, content: string) =>
        setCategorys((category) => {
            const copy = [...category[todo.category].todos];
            copy[copy.findIndex((i) => i.id === todo.id)] = { ...copy[copy.findIndex((i) => i.id === todo.id)], content: content };
            return { ...category, [todo.category]: { ...category[todo.category], todos: copy } };
        });

    const deleteCategory = (category: CategoryState) =>
        setCategorys((categorys) => {
            const copy = { ...categorys };
            delete copy[Object.keys(categorys).find((i) => categorys[i].title === category.title) as string];
            return { ...copy };
        });

    const changeCategoryLocation = (source: DraggableLocation, destination: DraggableLocation) => {
        setCategorys((categorys) => {
            const sourceId = Object.keys(categorys).find((i) => categorys[i].index === source.index);
            const destinationId = Object.keys(categorys).find((i) => categorys[i].index === destination.index);

            if (!sourceId || !destinationId) return { ...categorys };

            return {
                ...categorys,
                [sourceId]: { ...categorys[sourceId], index: destination.index },
                [destinationId]: { ...categorys[destinationId], index: source.index },
            };
        });
    };

    return {
        categoryArray,
        categorys, //
        setCategorys,
        addCategory,
        deleteCategory,
        changeCategoryLocation,
        removeTodo,
        changeTodoLocation,
        completeTodo,
        editTodoText,
    };
};

export default useTodos;
