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
    Chip,
    Divider,
    Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import SearchBar from '../../components/ui/SearchBar';
import Alert from '../../components/ui/Alert';
import '../../styles/globals.css';

const DrugListPage: React.FC = () => {
    const [drugs, setDrugs] = useState<DrugDto[]>([]);
    const [filteredDrugs, setFilteredDrugs] = useState<DrugDto[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listDrugs()
            .then((data) => {
                setDrugs(data);
                setFilteredDrugs(data);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load drugs.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredDrugs(drugs);
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        const filtered = drugs.filter(drug =>
            drug.name.toLowerCase().includes(normalizedQuery) ||
            (drug.manufacturer && drug.manufacturer.toLowerCase().includes(normalizedQuery)) ||
            (drug.description && drug.description.toLowerCase().includes(normalizedQuery))
        );

        setFilteredDrugs(filtered);
    };

    if (loading) {
        return <Spinner text="Loading medications..." />;
    }

    if (error) {
        return (
            <Container>
                <Typography color="error" align="center" className="mt-8 text-center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Box className="flex justify-between items-center mb-6 flex-wrap">
                <Typography variant="h4" gutterBottom className="mb-0">
                    Available Medications
                </Typography>
                <Box sx={{ width: { xs: '100%', sm: 300 }, mt: { xs: 2, sm: 0 } }}>
                    <SearchBar
                        placeholder="Search medications..."
                        onSearch={handleSearch}
                        initialValue={searchQuery}
                        minSearchLength={2}
                    />
                </Box>
            </Box>

            {searchQuery && (
                <Box className="mb-4">
                    <Paper className="p-3 bg-gray-100">
                        <Typography variant="body2" className="mb-2">
                            {filteredDrugs.length === 0
                                ? `No medications found matching "${searchQuery}"`
                                : `Found ${filteredDrugs.length} medication${filteredDrugs.length !== 1 ? 's' : ''} matching "${searchQuery}"`}
                        </Typography>
                        {filteredDrugs.length === 0 && (
                            <Button
                                size="small"
                                onClick={() => handleSearch('')}
                                variant="outlined"
                            >
                                Clear Search
                            </Button>
                        )}
                    </Paper>
                </Box>
            )}

            {filteredDrugs.length === 0 && !searchQuery ? (
                <Alert
                    type="info"
                    message="No medications are currently available."
                    isStatic={true}
                />
            ) : (
                <Grid container spacing={3}>
                    {filteredDrugs.map((drug) => (
                        <Grid item key={drug.id} xs={12} sm={6} md={4}>
                            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                                <CardContent className="flex-grow">
                                    <Typography variant="h6" className="font-bold">{drug.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom className="mb-2">
                                        {drug.manufacturer}
                                    </Typography>
                                    <Divider className="my-2" />
                                    <Box className="mt-2">
                                        <Chip
                                            label={drug.prescriptionRequired ? 'Prescription required' : 'Over-the-counter'}
                                            color={drug.prescriptionRequired ? 'primary' : 'success'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        component={RouterLink}
                                        to={`/drugs/${drug.id}`}
                                        size="small"
                                        color="primary"
                                    >
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

export default DrugListPage;