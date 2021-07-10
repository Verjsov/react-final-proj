import { useMutation, useQueryClient } from "react-query";
import { create } from "../api/OrderAPI";

export function useSaveOrder(cb = () => {}) {
    const queryClient = useQueryClient();
    return useMutation(({ firstName, lastName }) => {
        return create({
            firstName,
            lastName,
        });
    }, {
        onSuccess: () => {
            cb();
           // queryClient.invalidateQueries('posts');
        },
    })
}

/*
export function useCreateOrder(cb = () => {}) {
    const queryClient = useQueryClient();
    return useMutation(({ firstName, lastName }) => {
        return create({
            firstName,
            lastName,
        });
    }, {
        onSuccess: () => {
            cb();
            // queryClient.invalidateQueries('posts');
        },
    })
}
 */