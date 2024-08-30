/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';


export const fetchExpos = async (token) => {

    console.log(token)
    const response = await fetch('http://127.0.0.1:8000/api/v1/owner/exhibition/get/pending',
        {
            headers: {

                'Authorization': `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchExpoDetails = async (token, id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/owner/exhibition/get/pending/${id}`,
        {
            headers: {

                'Authorization': `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateExpoDetails = async (token, id, expoData) => {
    const formData = new FormData();

    Object.keys(expoData).forEach(key => {
        if (expoData[key]) {
            formData.append(key, expoData[key]);
        }
    });


    formData.append('_method', 'PATCH');
    formData.append('exhibition_id', id);

    const printFormData = (formData) => {
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    printFormData(formData);


    const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/exhibition/update`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createSection = async (sectionId, price, token) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('section_id', sectionId);
    formData.append('price', price);

    const response = await fetch('http://127.0.0.1:8000/api/v1/owner/exhibition/section/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fetchSections = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/owner/exhibition/section/get', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const useSections = (token) => {
    return useQuery({
        queryKey: ['sections'],
        queryFn: () => fetchSections(token),
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchSectionDetails = async (id, token) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/owner/exhibition/section/get/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};