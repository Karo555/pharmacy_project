import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrescriptionById } from '../../api/prescription';
import { PrescriptionDto } from '../../types/prescription';

const PrescriptionDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [prescription, setPrescription] = useState<PrescriptionDto | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                const data = await getPrescriptionById(Number(id));
                setPrescription(data);
            } catch (e: any) {
                setError(e.message || 'Failed to load prescription');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Container>
        );
    }

    if (!prescription) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>No prescription found.</Typography>
                <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                &larr; Back to List
            </Button>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {prescription.drugName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Dosage:</strong> {prescription.dosage}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Frequency:</strong> {prescription.frequency}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Issued At:</strong>{' '}
                        {new Date(prescription.issuedAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Expires At:</strong>{' '}
                        {new Date(prescription.expiresAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Prescription Required:</strong>{' '}
                        {prescription.prescriptionRequired ? 'Yes' : 'No'}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/prescriptions/${prescription.id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button color="error" onClick={() => {/* delete handler */}}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default PrescriptionDetailPage;