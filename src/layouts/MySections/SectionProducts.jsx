/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { fetchProductsSection, deleteProduct } from "../../util/ProductsHttp";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete, AiOutlinePlus, AiOutlineEdit, AiOutlineArrowLeft } from 'react-icons/ai';
import ProductForm from './ProductForm';
import './SectionProducts.css';
import lego2 from "../../assets/images/lego2.jpg"

const SectionProducts = () => {
    const location = useLocation();
    const { expoID } = location.state || {};

    const [loadingImage, setLoadingImage] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const { id } = useParams();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['sectionProducts', id, user.accessToken],
        queryFn: () => fetchProductsSection(user.accessToken, expoID)
    });

    const deleteMutation = useMutation({
        mutationFn: (productId) => deleteProduct(productId, user.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries(['sectionProducts', id, user.accessToken]);
            setShowModal(false);
        },
        onError: () => {
            setShowModal(false);
        }
    });

    const handleDelete = (productId) => {
        setDeleteProductId(productId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteProductId) {
            deleteMutation.mutate(deleteProductId);
        }
    };

    const handleImageLoad = (productId) => {
        setLoadingImage(null);
    };

    const handleImageError = (productId) => {
        setLoadingImage(productId);
    };

    const handleNextImage = (productId, imagesLength) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [productId]: (prevIndex[productId] ?? 0 + 1) % imagesLength,
        }));
    };

    const handlePrevImage = (productId, imagesLength) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [productId]: (prevIndex[productId] ?? 0 - 1 + imagesLength) % imagesLength,
        }));
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Typography color="error">Error loading products.</Typography>
            </Box>
        );
    }

    return (
        <div className='ExposBG'>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <button onClick={() => window.history.back()} className="back-button">
                    <AiOutlineArrowLeft size={24} /> Back
                </button>
                <button onClick={() => setShowForm(true)} className="add-product-button">
                    <AiOutlinePlus size={24} /> Add New Product
                </button>
            </Box>
            <div className="orders-container">
                {data.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    <div className="products-grid">
                        {data.data.map(product => {
                            const currentImageIdx = currentImageIndex[product.id] ?? 0;
                            const imagesLength = product.pictures.length;
                            const isLoading = loadingImage === product.id;
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-images">
                                        <div className="image-container">
                                            {isLoading && (
                                                <div className="spinner-overlay">
                                                    <CircularProgress />
                                                </div>
                                            )}
                                            <img
                                                src={lego2}
                                                alt={`${product.title} ${currentImageIdx}`}
                                                className={`main-image ${isLoading ? 'hidden' : ''}`}
                                                onLoad={() => handleImageLoad(product.id)}
                                                onError={() => handleImageError(product.id)}
                                            />
                                            {imagesLength > 1 && (
                                                <>
                                                    <button
                                                        className="arrow-button left-arrow"
                                                        onClick={() => handlePrevImage(product.id, imagesLength)}
                                                    >
                                                        <AiOutlineLeft size={24} />
                                                    </button>
                                                    <button
                                                        className="arrow-button right-arrow"
                                                        onClick={() => handleNextImage(product.id, imagesLength)}
                                                    >
                                                        <AiOutlineRight size={24} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h5 className="product-title">{product.title}</h5>
                                        <p className="product-price">Price: ${product.price}</p>
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            className="edit-button"
                                            onClick={() => setShowForm(true)}
                                        >
                                            <AiOutlineEdit size={24} />
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <AiOutlineDelete size={24} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-actions">
                        <button onClick={confirmDelete} className="confirm-button">
                            {deleteMutation.isLoading ? <CircularProgress size={24} /> : 'Yes, Delete'}
                        </button>
                        <button onClick={() => setShowModal(false)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showForm && (
                <ProductForm
                    onClose={() => setShowForm(false)}
                    onSuccess={() => queryClient.invalidateQueries(['sectionProducts', id, user.accessToken])}
                    expoID={expoID}
                    user={user}
                />
            )}
        </div>
    );
};

export default SectionProducts;
