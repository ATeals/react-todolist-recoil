import useTodos from "@/hooks/useTodos";
import { useForm } from "react-hook-form";

const CategoryForm = () => {
    const { handleSubmit, register } = useForm();
    const { addCategory } = useTodos();

    const onValid = ({ content }: any) => {
        addCategory(content);
    };

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                type="text"
                placeholder="todo?"
                {...register("content")}
            />
            <button>ADD</button>
        </form>
    );
};

export default CategoryForm;
