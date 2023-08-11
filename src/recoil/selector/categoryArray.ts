import { selector } from "recoil";
import categoryState, { CategoryState } from "../atom/category";

const categoryArrayState = selector({
    key: "CATEGORYARRAYSTATE",
    get: ({ get }) => {
        const categorys = get(categoryState);

        return Object.keys(categorys)
            .reduce((a: CategoryState[], c: string) => {
                return [...a, categorys[c]];
            }, [])
            .sort((a, b) => a.index - b.index);
    },
});

export default categoryArrayState;
