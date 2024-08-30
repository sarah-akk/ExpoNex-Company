/* eslint-disable prettier/prettier */
export const fetchProducts = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/owner/product/get", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteProduct = async (productId, accessToken) => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/owner/product/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ product_id: productId, _method: "DELETE" }),
    });

    if (!response.ok) {
        throw new Error("Error deleting product");
    }

    return productId;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchProductsSection = async (token, expoId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/owner/product/get?expo_id=${expoId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const createProduct = async (product, token) => {

    const response = await fetch(
        'http://127.0.0.1:8000/api/v1/owner/product/create',
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: product,
        }

    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
    }

    return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const searchProductsByExpo = async (expoName, accessToken) => {

    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/owner/product/get?search=${expoName}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error fetching search results');
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
    }

    return response.json();
};
