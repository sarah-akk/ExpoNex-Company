/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// src/components/ProductForm.js

import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import { fetchCategories } from "../../util/CategoryHttp";
import { useAuth } from "../../context/AuthContext";
import { createProduct } from "../../util/ProductsHttp";
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const ProductForm = ({ onClose, onSuccess, expoID, user }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        pictures: [],
        price: '',
        quantity: '',
        categories: []
    });

    const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(user.accessToken)
    });

    const createMutation = useMutation({
        mutationFn: (formData) => createProduct(formData, user.accessToken),
        onSuccess: () => {
            onSuccess();
            onClose();
            setNewProduct({
                name: '',
                description: '',
                pictures: [],
                price: '',
                quantity: '',
                categories: []
            });
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProduct(prevState => ({
            ...prevState,
            pictures: files
        }));
    };

    const handleCategoryChange = (selectedOptions) => {
        setNewProduct(prevState => ({
            ...prevState,
            categories: selectedOptions.map(option => option.value)
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('exhibition_id', expoID);
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('quantity', newProduct.quantity);
        newProduct.categories.forEach((category) => {
            formData.append('categories[]', category);
        });

        newProduct.pictures.forEach((file, index) => {
            formData.append(`pictures[${index}]`, file);
        });

        createMutation.mutate(formData);
    };

    if (isCategoriesLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    const categoryOptions = categories.data.map(category => ({
        value: category.id,
        label: category.title
    }));

    return (
        <div className="form-overlay">
            <form className="product-form" onSubmit={handleFormSubmit}>
                <h2>Add New Product</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Pictures:
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        placeholder='at least 500'
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        placeholder='at least 5'
                        value={newProduct.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Categories:
                    <Select
                        isMulti
                        className='categoriesOptions'
                        options={categoryOptions}
                        onChange={handleCategoryChange}
                        value={categoryOptions.filter(option => newProduct.categories.includes(option.value))}
                    />
                </label>
                <button
                    type="submit"
                    className="submit-button"
                    disabled={createMutation.isLoading}
                >
                    {createMutation.isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="80px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        'Add Product'
                    )}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="cancel-button"
                >
                    Cancel
                </button>
            </form>
            {createMutation.isLoading && (
                <div className="loading-overlay">
                    <CircularProgress size={60} />
                </div>
            )}
        </div>
    );
};

export default ProductForm;
