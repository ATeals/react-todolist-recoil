import { atom } from "recoil";

export interface Todoitem {
    id: string;
    content: string;
    isComplete: boolean;
    category: string;
}

export interface CategoryState {
    title: string;
    id: string;
    index: number;
    todos: Todoitem[];
}

interface CategoryObject {
    [key: string]: CategoryState;
}

const categoryState = atom<CategoryObject>({
    key: "CATEGORYSTATE",
    default: {
        "1": {
            index: 0,
            title: "TODO",
            id: "1",
            todos: [
                { id: "1123124", content: "a", isComplete: false, category: "1" },
                { id: "25123123", content: "b", isComplete: false, category: "1" },
                { id: "3125123", content: "c", isComplete: false, category: "1" },
            ],
        },
        "2": {
            index: 1,
            title: "DOING",
            id: "2",
            todos: [
                { id: "41231251", content: "d", isComplete: false, category: "2" },
                { id: "5123123", content: "e", isComplete: false, category: "2" },
            ],
        },
        "3": {
            index: 2,
            title: "DONE",
            id: "3",
            todos: [
                { id: "65124123", content: "f", isComplete: false, category: "3" },
                { id: "7125123", content: "f", isComplete: false, category: "3" },
                { id: "81241424", content: "f", isComplete: false, category: "3" },
            ],
        },
    },
});

export default categoryState;
