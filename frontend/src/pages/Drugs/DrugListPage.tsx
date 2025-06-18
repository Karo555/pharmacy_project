import React, { useEffect, useState } from 'react';
import { listDrugs } from '../../api/drug';
import { DrugDto } from '../../types/drug';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const DrugListPage: React.FC = () => {
    const [drugs, setDrugs] = useState<DrugDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listDrugs()
            .then(setDrugs)
            .catch((err) => {
                console.error(err);
                setError('Failed to load drugs.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box sx={{ display:'flex', justifyContent:'center', mt:4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error" align="center" mt={4}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Available Medications
            </Typography>
            <Grid container spacing={3}>
                {drugs.map((drug) => (
                    <Grid item key={drug.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{drug.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {drug.manufacturer}
                                </Typography>
                                <Typography variant="body2">
                                    {drug.prescriptionRequired ? 'Prescription required' : 'OTC'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    component={RouterLink}
                                    to={`/drugs/${drug.id}`}
                                    size="small"
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DrugListPage;