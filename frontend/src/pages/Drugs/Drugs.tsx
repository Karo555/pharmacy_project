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
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Chip,
    Grid,
    InputAdornment,
    IconButton,
    Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

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

    // Pagination state
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    // Sorting and filtering state
    const [sort, setSort] = useState('name,asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [prescriptionFilter, setPrescriptionFilter] = useState('');

    // Debounced search to prevent too many API calls
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (!token) return;

        const fetchDrugs = async () => {
            setLoading(true);
            try {
                const params: Record<string, any> = {
                    page,
                    size: pageSize,
                    sort
                };

                if (debouncedSearch) {
                    params.name = debouncedSearch;
                }

                if (filterType) {
                    params.type = filterType;
                }

                if (prescriptionFilter) {
                    params.prescriptionRequired = prescriptionFilter === 'prescription';
                }

                const resp = await axios.get<Page<Drug>>('/api/drugs', {
                    headers: { Authorization: `Bearer ${token}` },
                    params
                });

                setDrugs(resp.data.content);
                setTotalPages(resp.data.totalPages);
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
    }, [token, page, pageSize, sort, debouncedSearch, filterType, prescriptionFilter]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1); // MUI Pagination is 1-indexed, our API is 0-indexed
    };

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSort(event.target.value as string);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page when searching
    };

    const handleTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterType(event.target.value as string);
        setPage(0);
    };

    const handlePrescriptionFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPrescriptionFilter(event.target.value as string);
        setPage(0);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilterType('');
        setPrescriptionFilter('');
        setSort('name,asc');
        setPage(0);
    };

    const renderFilters = () => (
        <Box sx={{ mb: 4, mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Search drugs"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort By"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SortIcon />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="name,asc">Name (A-Z)</MenuItem>
                            <MenuItem value="name,desc">Name (Z-A)</MenuItem>
                            <MenuItem value="manufacturer,asc">Manufacturer (A-Z)</MenuItem>
                            <MenuItem value="manufacturer,desc">Manufacturer (Z-A)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={filterType}
                            onChange={handleTypeFilterChange}
                            label="Type"
                            startAdornment={
                                <InputAdornment position="start">
                                    <FilterListIcon />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="tablet">Tablet</MenuItem>
                            <MenuItem value="capsule">Capsule</MenuItem>
                            <MenuItem value="liquid">Liquid</MenuItem>
                            <MenuItem value="cream">Cream</MenuItem>
                            <MenuItem value="injection">Injection</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Prescription</InputLabel>
                        <Select
                            value={prescriptionFilter}
                            onChange={handlePrescriptionFilterChange}
                            label="Prescription"
                            startAdornment={
                                <InputAdornment position="start">
                                    <LocalPharmacyIcon />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="prescription">Prescription Required</MenuItem>
                            <MenuItem value="otc">Over the Counter</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={clearFilters}
                        fullWidth
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>

            {(filterType || prescriptionFilter || searchQuery) && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {searchQuery && (
                        <Chip
                            label={`Search: ${searchQuery}`}
                            onDelete={() => setSearchQuery('')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {filterType && (
                        <Chip
                            label={`Type: ${filterType}`}
                            onDelete={() => setFilterType('')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {prescriptionFilter && (
                        <Chip
                            label={prescriptionFilter === 'prescription' ? 'Prescription Required' : 'Over the Counter'}
                            onDelete={() => setPrescriptionFilter('')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>
            )}
        </Box>
    );

    if (loading && page === 0) {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Browse Medications
                </Typography>
                <MedicationIcon fontSize="large" color="primary" />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {renderFilters()}

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && drugs.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No drugs found matching your criteria. Try adjusting your filters.
                </Alert>
            )}

            <Grid container spacing={3}>
                {drugs.map((drug) => (
                    <Grid item key={drug.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {drug.name}
                                    </Typography>
                                    {drug.prescriptionRequired ? (
                                        <Chip
                                            size="small"
                                            label="Rx"
                                            color="secondary"
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    ) : (
                                        <Chip
                                            size="small"
                                            label="OTC"
                                            color="success"
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    )}
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        lineHeight: '1.5em',
                                        height: '3em'
                                    }}
                                >
                                    {drug.description}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Manufacturer:</strong> {drug.manufacturer}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 0.5 }}>
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
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {totalPages > 0 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handleChangePage}
                        color="primary"
                        showFirstButton
                        showLastButton
                        size="large"
                    />
                </Box>
            )}
        </Container>
    );
};

export default Drugs;
