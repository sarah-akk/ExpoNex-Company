/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { fetchSectionDetails } from "../../util/ExposHttp";
import { useAuth } from "../../context/AuthContext";
import './SectionDetails.css';
import arrow from "../../assets/images/arrow.png"

const SectionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { expoID } = location.state || {};
    const { user } = useAuth();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['sectionDetails', id, user.accessToken],
        queryFn: () => fetchSectionDetails(id, user.accessToken)
    });

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            navigate(`/dashboard/section-products/${id}`, { state: { expoID } });
        }
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
                <Typography color="error">Error loading section details.</Typography>
            </Box>
        );
    }

    return (
        <div className='ExposBG'>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box flex={1} mr={2}>
                    <Typography variant="h4" className="title">Section Details:</Typography>
                    <Box>
                        <Tabs value={value} onChange={handleChange} aria-label="section details tabs">
                            <Tab label="Status" />
                            <Tab label=" -> See Products" />
                        </Tabs>
                        <Box p={3}>
                            {value === 0 && (
                                <Box>
                                    <Typography variant="h6" className="title2">
                                        Prices that have been bid on by the department so far:
                                    </Typography>
                                    <Box mt={2}>
                                        {data.data.prices.length > 0 ? (
                                            <ul>
                                                {data.data.prices.map((price, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body1">
                                                            ${price.toFixed(2)}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Typography variant="body1">No prices have been bid on yet.</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box flex={1}>
                    <img
                        src={arrow}
                        alt="Section Image"
                        className="section-image"
                    />
                </Box>
            </Box>
        </div>
    );
};

export default SectionDetails;
