/* eslint-disable prettier/prettier */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchCategories = async (authToken) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/owner/category/get', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { data: [] };
    }
};

export const useCategories = (token) => {
    return useQuery({
        queryKey: ['categories', token],
        queryFn: () => fetchCategories(token),
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

