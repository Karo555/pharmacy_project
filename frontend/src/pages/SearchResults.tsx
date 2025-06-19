import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Divider
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { getPublicDrugs, listDrugs, searchPublicDrugs } from '../api/drug';
import { DrugDto } from '../types/drug';
import PublicSearchResults from '../components/Search/PublicSearchResults';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { useAuth } from '../hooks/useAuth';
import '../styles/globals.css';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const { token } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<DrugDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(!!initialQuery);
  const [error, setError] = useState<string | null>(null);

  // Store searched queries to avoid duplicate searches
  const [searchedQueries, setSearchedQueries] = useState<Set<string>>(new Set());
  // Use a ref to track whether initial search has been performed
  const initialSearchDone = useRef<boolean>(false);

  // Use a ref to hold the fetchInitialDrugs function to break the circular dependency
  const fetchInitialDrugsRef = useRef<() => Promise<void> | null>(null);
  // Load initial set of medications
  const fetchInitialDrugs = useCallback(async () => {
    if (loading) {
      try {
        const data = token ? await listDrugs() : await getPublicDrugs();
        setResults(data);
      } catch (err) {
        console.error('Failed to load drugs:', err);
        setError('Failed to load medications. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  }, [loading, token]);

  // Update the ref whenever fetchInitialDrugs changes
  useEffect(() => {
    fetchInitialDrugsRef.current = fetchInitialDrugs;
  }, [fetchInitialDrugs]);

  // Perform search using the appropriate endpoint based on auth status
  const performSearch = useCallback(async (query: string) => {
    console.log('performSearch called with query:', query);
    console.log('performSearch deps:', {
      searchedQueriesSize: searchedQueries.size,
      searchQuery,
      hasToken: !!token
    });

    // Skip if this exact query has been searched before
    if (searchedQueries.has(query.trim().toLowerCase())) {
      console.log('Search skipped - query already searched');
      return;
    }

    // Don't skip based on matching current query during initial search
    // This was causing the initial search to be skipped
    if (!initialSearchDone.current &&
        query.trim().toLowerCase() === searchQuery.trim().toLowerCase()) {
      console.log('NOT skipping initial search even though query matches searchQuery');
    }
    // Skip if it's not initial search and matches current query
    else if (initialSearchDone.current &&
             query.trim().toLowerCase() === searchQuery.trim().toLowerCase()) {
      console.log('Search skipped - query matches current query (not initial search)');
      return;
    }

    if (!query.trim()) {
      console.log('Empty query, calling fetchInitialDrugs');
      fetchInitialDrugsRef.current && fetchInitialDrugsRef.current();
      return;
    }

    setLoading(true);
    setSearching(true);
    setError(null);

    try {
      // Use the appropriate API based on authentication status
      if (token) {
        // If user is logged in, we could implement a protected search endpoint
        // For now, we'll filter the full drug list on the client
        const allDrugs = await listDrugs();
        const filtered = filterDrugs(query, allDrugs);
        setResults(filtered);

        // If no results found, remember this query to avoid searching again
        if (filtered.length === 0) {
          setSearchedQueries(prev => new Set([...prev, query.trim().toLowerCase()]));
        }
      } else {
        // For public users, use the dedicated public search endpoint
        const data = await searchPublicDrugs(query);
        setResults(data);

        // If no results found, remember this query to avoid searching again
        if (data.length === 0) {
          setSearchedQueries(prev => new Set([...prev, query.trim().toLowerCase()]));
        }
      }
    } catch (err) {
      console.error('Error searching drugs:', err);
      setError('Failed to search medications. Please try again later.');

      // Remember failed queries to avoid repeating them
      setSearchedQueries(prev => new Set([...prev, query.trim().toLowerCase()]));
    } finally {
      setLoading(false);
    }
  }, [searchedQueries, searchQuery, token]);

  // Fetch initial results when component mounts or when location changes
  useEffect(() => {
    console.log('Main useEffect running with deps:', {
      initialQuery,
      hasToken: !!token,
      performSearchRef: typeof performSearch
    });

    console.log('Dependency array values:', JSON.stringify({
      initialQuery,
      tokenExists: !!token,
      performSearchIdentity: performSearch.toString().substring(0, 50) + '...'
    }));

    // Reset the initialSearchDone ref when the location changes
    initialSearchDone.current = false;

    if (initialQuery && !initialSearchDone.current) {
      console.log('Running initial search with query:', initialQuery);
      performSearch(initialQuery);
      initialSearchDone.current = true;
    } else if (!initialQuery && !initialSearchDone.current) {
      console.log('No initial query, fetching initial drugs');
      fetchInitialDrugs();
      initialSearchDone.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, token, performSearch]);

  // Client-side filtering function (used for authenticated users)
  const filterDrugs = (query: string, drugList: DrugDto[]): DrugDto[] => {
    if (!query.trim()) {
      return drugList;
    }

    const normalizedQuery = query.toLowerCase().trim();
    return drugList.filter(drug =>
      drug.name.toLowerCase().includes(normalizedQuery) ||
      (drug.manufacturer && drug.manufacturer.toLowerCase().includes(normalizedQuery)) ||
      (drug.description && drug.description.toLowerCase().includes(normalizedQuery))
    );
  };

  // Handle search submission from the search bar
  const handleSearch = (query: string) => {
    // Don't search again if this exact query has been searched before and found no results
    if (searchedQueries.has(query.trim().toLowerCase())) {
      setSearchQuery(query);
      setResults([]);
      setLoading(false);
      setSearching(true);

      // Update URL without page refresh
      const newUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
      navigate(newUrl, { replace: true });

      return;
    }

    setSearchQuery(query);

    // Update URL without page refresh
    const newUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
    navigate(newUrl, { replace: true });

    performSearch(query);
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">Search Results</Typography>
      </Breadcrumbs>

      <Typography variant="h4" className="mb-6">
        Search Medications
      </Typography>

      {/* Search Box */}
      <Paper elevation={3} className="p-4 mb-8 rounded-lg">
        <Typography variant="h6" className="mb-3">
          Find medications by name, manufacturer, or description
        </Typography>
        <SearchBar
          placeholder="Search for medications..."
          onSearch={handleSearch}
          initialValue={searchQuery}
          fullWidth={true}
        />
      </Paper>

      {/* Loading state */}
      {loading && (
        <Box className="text-center py-8">
          <Spinner text="Searching medications..." />
        </Box>
      )}

      {/* Error state */}
      {error && !loading && (
        <Alert
          type="error"
          message={error}
          isStatic={true}
        />
      )}

      {/* Results Display */}
      {!loading && !error && searching && (
        <Box>
          <Divider className="mb-6" />
          <PublicSearchResults
            results={results}
            searchQuery={searchQuery}
            loading={loading}
          />
        </Box>
      )}

      {/* Initial State - No Search Performed */}
      {!searching && !loading && (
        <Box className="text-center py-10">
          <Typography variant="h5" className="mb-2">
            Enter a search term to find medications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Search by medication name, manufacturer, or description
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchResults;