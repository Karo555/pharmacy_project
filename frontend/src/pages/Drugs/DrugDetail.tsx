import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Chip,
    Stack,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

interface Drug {
    id: number;
    name: string;
    manufacturer: string;
    description: string;
    dosage: string;
    type: string;
    prescriptionRequired: boolean;
}

const DrugDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const [drug, setDrug] = useState<Drug | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !id) return;
        const fetchDrug = async () => {
            try {
                const resp = await axios.get<Drug>(`/api/drugs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDrug(resp.data);
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    'Failed to load drug details'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchDrug();
    }, [token, id]);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button component={RouterLink} to="/drugs" sx={{ mt: 2 }}>
                    Back to list
                </Button>
            </Container>
        );
    }

    if (!drug) {
        return null;
    }

    return (
        <Container sx={{ py: 4 }}>
            <Button component={RouterLink} to="/drugs" sx={{ mb: 3 }}>
                &larr; Back to Drugs
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {drug.name}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip label={drug.type} color="primary" />
                        {drug.prescriptionRequired && <Chip label="Prescription Required" color="warning" />}
                    </Stack>

                    <Typography variant="subtitle1" gutterBottom>
                        Manufacturer: {drug.manufacturer}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {drug.description}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2"><strong>Dosage:</strong> {drug.dosage}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default DrugDetail;