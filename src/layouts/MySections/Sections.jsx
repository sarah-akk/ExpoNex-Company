/* eslint-disable prettier/prettier */
import React from 'react';
import { useSections } from '../../util/ExposHttp';
import './Sections.css';
import { useAuth } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sections = () => {
    const { user } = useAuth();
    const { data, isLoading, isError } = useSections(user.accessToken);
    const navigate = useNavigate();

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
                <Typography color="error">Error loading sections.</Typography>
            </Box>
        );
    }

    if (!data || !data.data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Typography color="error">No sections data available.</Typography>
            </Box>
        );
    }

    const handleNavigate = (sectionId, expoID) => {
        navigate(`/dashboard/sections/${sectionId}`, { state: { expoID } });
    };

    return (
        <div className='ExposBG'>
            <Typography variant="h5" className="title">All Sections:</Typography>
            <div className="sections-list">
                {data.data.map(section => (
                    <Card key={section.id} className="section-card">
                        <CardContent>
                            <Typography variant="h6" className="exhibition-text">
                                <strong>Exhibition:</strong> {section.exhibition.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Size:</strong> {section.size} sq. ft.
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Price:</strong> ${section.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Given Price:</strong> ${section.given_price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Created At:</strong> {new Date(section.created_at).toLocaleString()}
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    <strong>Positions:</strong> {section.positions.join(', ')}
                                </Typography>
                                <Button
                                    className="details-text"
                                    variant="contained"
                                    onClick={() => handleNavigate(section.id, section.exhibition.id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    View Details
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Sections;
