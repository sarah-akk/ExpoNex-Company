/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createCompany } from '../../util/AuthHttp';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        companyname: '',
        description: '',
        profile_picture: null,
        documentsD: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => createCompany(data, user.accessToken),
        onSuccess: () => {
            alert('Company created successfully');
            setFormData({
                name: '',
                companyname: '',
                description: '',
                profile_picture: null,
                documentsD: []
            });
            navigate("/dashboard/Home");
        },
        onError: (error) => {
            console.error('Error creating company:', error);
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files
        }));
    };

    const handleFormSubmit = (e) => {

        e.preventDefault();
        const data = new FormData();
        data.append('_method', 'PUT');
        data.append('name', formData.name);
        data.append('companyname', formData.companyname);
        data.append('description', formData.description);
        if (formData.profile_picture) {
            for (let i = 0; i < formData.profile_picture.length; i++) {
                data.append('profile_picture', formData.profile_picture[i]);
            }
        }
        if (formData.documentsD) {
            for (let i = 0; i < formData.documentsD.length; i++) {
                data.append('documentsD', formData.documentsD[i]);
            }
        }
        createMutation.mutate(data);
    };

    return (
        <Box p={3}>
            <h1>Create Company</h1>
            <form onSubmit={handleFormSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Company Name"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <InputLabel>Profile Picture</InputLabel>
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                        multiple
                    />
                </Box>
                <Box mb={2}>
                    <InputLabel>Documents</InputLabel>
                    <input
                        type="file"
                        name="documentsD"
                        onChange={handleFileChange}
                        multiple
                    />
                </Box>
                <Box mb={2}>
                    <Button type="submit" variant="contained" color="primary">
                        {createMutation.isLoading ? <CircularProgress size={24} /> : 'Create Company'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateCompany;
