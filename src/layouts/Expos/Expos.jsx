/* eslint-disable prettier/prettier */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import "./Expos.css";
import { fetchExpos } from "../../util/ExposHttp";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../context/AuthContext";
import ExpoItem from 'components/ExpoItem/ExpoItem';
import { Typography, Card, CardContent, Button } from '@mui/material';

const Expos = () => {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ['expos'],
    queryFn: () => fetchExpos(user.accessToken),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <div>Failed to fetch Expos</div>;

  if (!data || !data.data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography color="error">No sections data available.</Typography>
      </Box>
    );
  }
  return (
    <>
      <div className='ExposBG'>
        <div className="ExposTitle">
          Pending Expos:
        </div>
        <ul id="Expos">
          {data.data.map((expo) => (
            <ExpoItem key={expo.id} expo={expo} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Expos;
