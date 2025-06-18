// src/components/Drugs/DrugDetail.tsx

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { DrugDto } from '../../types/drug';

interface DrugDetailProps {
    drug: DrugDto;
}

const DrugDetail: React.FC<DrugDetailProps> = ({ drug }) => {
    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">{drug.name}</Typography>
                    <Chip
                        label={drug.prescriptionRequired ? 'Prescription' : 'Over the Counter'}
                        color={drug.prescriptionRequired ? 'error' : 'success'}
                    />
                </Box>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {drug.type} — {drug.manufacturer}
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Dosage:</strong> {drug.dosage}
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {drug.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DrugDetail;