import { Skeleton } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const Skeletons = () => {
  return (
    <Container maxWidth={false}>
      <Skeleton variant="rounded" width="100%" height={261} sx={{ margin: "1em" }}/>
      <Skeleton variant="rounded" width="100%" height={261} sx={{ margin: "1em" }}/>
      <Skeleton variant="rounded" width="100%" height={261} sx={{ margin: "1em" }}/>
      <Skeleton variant="rounded" width="100%" height={261} sx={{ margin: "1em" }}/>
    </Container>
  );
};

export default Skeletons
