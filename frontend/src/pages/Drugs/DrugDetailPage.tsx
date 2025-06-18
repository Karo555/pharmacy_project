import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, CircularProgress, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getDrugById } from '../../api/drug';
import { DrugDto } from '../../types/drug';
import DrugDetail from '../../components/Drugs/DrugDetail';

const DrugDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [drug, setDrug] = useState<DrugDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        getDrugById(+id)
            .then(d => setDrug(d))
            .catch(() => setError('Failed to load'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
    }

    if (error || !drug) {
        return (
            <Container sx={{ mt: 8 }}>
                <Typography color="error">{error || 'Not found'}</Typography>
                <Button component={RouterLink} to="/drugs" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                    Back to list
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Button component={RouterLink} to="/drugs" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
                Back to Drugs
            </Button>
            <DrugDetail drug={drug} />
        </Container>
    );
};

export default DrugDetailPage;