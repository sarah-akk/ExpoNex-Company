/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete } from 'react-icons/ai';
import { fetchProducts, deleteProduct, searchProductsByExpo } from '../../util/ProductsHttp';
import { useAuth } from "../../context/AuthContext";
import './Orders.css';
import Box from '@mui/material/Box';
import lego2 from "../../assets/images/lego2.jpg"

const Orders = () => {
    const [loadingImage, setLoadingImage] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [productsData, setProductsData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: allProducts, isLoading: isLoadingAllProducts, isError: isErrorAllProducts } = useQuery({
        queryKey: ['Products', user.accessToken],
        queryFn: () => fetchProducts(user.accessToken),
    });

    const mutation = useMutation({
        mutationFn: (productId) => deleteProduct(productId, user.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries(['Products', user.accessToken]);
            setShowModal(false);
        },
        onError: () => {
            setShowModal(false);
        }
    });

    const searchQueryFn = async (query) => {
        if (!query) {
            setProductsData(allProducts?.data || []);
            return;
        }
        try {
            const response = await searchProductsByExpo(query, user.accessToken);
            setProductsData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching search results:', error);
            setProductsData([]);
        }
    };

    const handleSearchClick = () => {
        setIsSearching(true);
        searchQueryFn(searchQuery);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (productId) => {
        setDeleteProductId(productId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteProductId) {
            mutation.mutate(deleteProductId);
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

    useEffect(() => {
        if (!isSearching) {
            setProductsData(allProducts?.data || []);
        }
    }, [allProducts, isSearching]);

    if (isLoadingAllProducts) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    if (isErrorAllProducts && !isSearching) return <div>Error fetching products</div>;

    return (
        <div className='ExposBG'>
            <h1 className="title">All Products:</h1>
            <div className="search-container2">
                <input
                    type="text"
                    placeholder="Search for expo name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar2"
                />
                <button
                    onClick={handleSearchClick}
                    className="search-button"
                >
                    Search
                </button>
            </div>
            <div className="orders-container">
                {productsData.length === 0 ? (
                    <div>No products available</div>
                ) : (
                    <div className="products-grid">
                        {productsData.map(product => {
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
                                        <h5 className="product-title">lego</h5>
                                        <p className="product-price">Price: ${product.price}</p>
                                    </div>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <AiOutlineDelete size={24} />
                                    </button>
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
                            {mutation.isLoading ? <CircularProgress size={24} /> : 'Yes, Delete'}
                        </button>
                        <button onClick={() => setShowModal(false)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
