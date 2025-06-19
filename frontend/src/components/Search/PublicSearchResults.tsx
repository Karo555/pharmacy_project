import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  useTheme,
  CardActions
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DrugDto } from '../../types/drug';
import '../../styles/globals.css';

interface PublicSearchResultsProps {
  results: DrugDto[];
  searchQuery: string;
  loading: boolean;
}

const PublicSearchResults: React.FC<PublicSearchResultsProps> = ({
  results,
  searchQuery,
  loading
}) => {
  const theme = useTheme();

  // Show limited results for non-logged in users
  const limitedResults = results.slice(0, 6);
  const hasMore = results.length > limitedResults.length;

  if (loading) {
    return (
      <Box className="py-8 text-center">
        <Typography variant="body1">Searching medications...</Typography>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box className="py-8 text-center">
        <Typography variant="h6" className="mb-2">No medications found matching "{searchQuery}"</Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search terms or browse our categories.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box className="mb-6">
        <Typography variant="h5" className="mb-2">
          Found {results.length} medications matching "{searchQuery}"
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Showing {limitedResults.length} of {results.length} results
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {limitedResults.map((drug) => (
          <Grid item xs={12} sm={6} md={4} key={drug.id}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardContent className="flex-grow">
                <Typography variant="h6" className="font-bold mb-1">{drug.name}</Typography>
                <Typography variant="body2" color="text.secondary" className="mb-2">
                  {drug.manufacturer}
                </Typography>

                <Divider className="my-2" />

                {drug.description && (
                  <Typography variant="body2" className="mb-3 text-sm" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {drug.description}
                  </Typography>
                )}

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

      {hasMore && (
        <Box className="mt-8 text-center p-6 bg-gray-100 rounded-lg">
          <Typography variant="h6" className="mb-2">
            Want to see all {results.length} results?
          </Typography>
          <Typography variant="body1" className="mb-4">
            Sign in or create an account to access our full medication catalog.
          </Typography>
          <Box className="flex justify-center gap-3">
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              sx={{
                borderRadius: '50px',
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
              sx={{
                borderRadius: '50px',
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PublicSearchResults;
