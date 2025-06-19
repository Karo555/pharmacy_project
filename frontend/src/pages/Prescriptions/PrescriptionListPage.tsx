import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { listPrescriptions } from '../../api/prescription';
import { PrescriptionDTO } from '../../types/prescription';
import Spinner from '../../components/ui/Spinner';
import '../../styles/globals.css';

const PrescriptionListPage: React.FC = () => {
    const [prescriptions, setPrescriptions] = useState<PrescriptionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await listPrescriptions();

                let arr: PrescriptionDTO[] = [];
                if (Array.isArray(data)) {
                    arr = data;
                } else if (data && Array.isArray((data as any).content)) {
                    // maybe a paged response?
                    arr = (data as any).content;
                } else {
                    console.warn('Unexpected prescriptions payload shape:', data);
                }

                setPrescriptions(arr);
            } catch (e: any) {
                setError(e.message || 'Failed to load prescriptions');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) {
        return <Spinner text="Loading prescriptions..." />;
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Prescriptions
            </Typography>

            {prescriptions.length === 0 ? (
                <Typography>No prescriptions found.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {prescriptions.map((p) => (
                        <Grid item xs={12} md={6} key={p.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {p.drugName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Dosage: {p.dosage}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Frequency: {p.frequency}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Issued: {new Date(p.issuedAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Expires: {new Date(p.expiresAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/prescriptions/${p.id}`)}>
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default PrescriptionListPage;