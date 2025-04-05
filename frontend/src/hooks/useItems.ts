import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Item {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
}

interface NewItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface PaginatedResponse {
    docs: Item[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

interface ItemQueryParams {
    page?: number;
    limit?: number;
}

export function useItems() {
    const queryClient = useQueryClient();

    const useGetItems = (params: ItemQueryParams = { page: 1, limit: 10 }) => {
        return useQuery({
            queryKey: ['items', params],
            queryFn: async () => {
                const response = await api.get<PaginatedResponse>('/item', { params });
                return response.data;
            },
        });
    };

    const addItem = useMutation({
        mutationFn: async (newItem: NewItem) => {
            const response = await api.post<{ message: string; result: Item }>('/item/add', newItem);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });

    return {
        useGetItems,
        addItem: addItem.mutate,
        isAddingItem: addItem.isPending,
        addItemError: addItem.error,
    };
} 