// File: frontend/src/pages/Drugs/Drugs.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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

interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

const Drugs: React.FC = () => {
    const { token } = useAuth();
    const [drugs, setDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        const fetchDrugs = async () => {
            try {
                const resp = await axios.get<Page<Drug>>('/api/drugs', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page: 0, size: 20, sort: 'name,asc' },
                });
                setDrugs(resp.data.content);
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    'Failed to load drugs'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDrugs();
    }, [token]);

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
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Available Drugs
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                }}
            >
                {drugs.map((drug) => (
                    <Box
                        key={drug.id}
                        sx={{
                            width: {
                                xs: '100%',      // full width on extra-small screens
                                sm: '50%',       // two columns on small screens
                                md: '33.3333%',  // three columns on medium and up
                            },
                        }}
                    >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {drug.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {drug.description}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Dosage:</strong> {drug.dosage}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Type:</strong> {drug.type}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={RouterLink}
                                    to={`/drugs/${drug.id}`}
                                >
                                    View
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Drugs;
