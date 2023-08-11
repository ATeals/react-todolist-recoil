import { Dispatch, useEffect, useState } from "react";

const useEditTyping = (initialValue: string, handleEditComplete: () => void): [string, Dispatch<React.SetStateAction<string>>] => {
    const [typing, setTyping] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleEditComplete();
        }, 1000);

        return () => clearTimeout(timer);
    }, [typing]);

    return [typing, setTyping];
};

export default useEditTyping;
