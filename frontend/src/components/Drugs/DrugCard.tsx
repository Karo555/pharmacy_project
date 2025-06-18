import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Chip, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DrugDto } from '../../types/drug';

interface DrugCardProps {
    drug: DrugDto;
}

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => (
    <Card elevation={3}>
        <CardActionArea component={RouterLink} to={`/drugs/${drug.id}`}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" component="h2">
                        {drug.name}
                    </Typography>
                    <Chip
                        label={drug.prescriptionRequired ? 'Rx' : 'OTC'}
                        size="small"
                        color={drug.prescriptionRequired ? 'error' : 'success'}
                    />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph noWrap>
                    {drug.manufacturer} — {drug.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    Dosage: {drug.dosage}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default DrugCard;