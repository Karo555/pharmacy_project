import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PrescriptionDTO } from '../../types/prescription';

interface Props {
    prescription: PrescriptionDTO;
}

const PrescriptionCard: React.FC<Props> = ({ prescription }) => {
    const navigate = useNavigate();

    const {
        id,
        drugName,
        dosage,
        frequency,
        prescriptionRequired,
        issuedAt,
        expiresAt,
    } = prescription;

    return (
        <Card elevation={2} sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{drugName}</Typography>
                    <Chip
                        label={prescriptionRequired ? 'Rx Required' : 'OTC'}
                        color={prescriptionRequired ? 'warning' : 'success'}
                        size="small"
                    />
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Dosage: {dosage}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Frequency: {frequency}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    Issued: {new Date(issuedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    Expires: {new Date(expiresAt).toLocaleDateString()}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" onClick={() => navigate(`/prescriptions/${id}`)}>
                    View
                </Button>
                <Button
                    size="small"
                    onClick={() => navigate(`/prescriptions/${id}/edit`)}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default PrescriptionCard;