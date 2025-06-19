import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { listDrugs } from '../../api/drug';
import {PrescriptionCreateRequestDTO, PrescriptionDTO} from "@/types/prescription";


interface Props {
    initialData?: PrescriptionDTO;
    onSubmit: (values: PrescriptionCreateRequestDTO) => Promise<void>;
}

const PrescriptionForm: React.FC<Props> = ({ initialData, onSubmit }) => {
    const [drugs, setDrugs] = useState<{ id: number; name: string }[]>([]);
    const [form, setForm] = useState<PrescriptionCreateRequestDTO>({
        drugId: (initialData as any)?.drugId || 0,
        dosage: initialData?.dosage || '',
        frequency: initialData?.frequency || '',
        prescriptionRequired: initialData?.prescriptionRequired || false,
        issuedAt: initialData
            ? new Date(initialData.issuedAt).toISOString().slice(0, 16)
            : '',
        expiresAt: initialData
            ? new Date(initialData.expiresAt).toISOString().slice(0, 16)
            : '',
    });
    const [loadingDrugs, setLoadingDrugs] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listDrugs()
            .then((data) =>
                setDrugs(data.map((d) => ({ id: d.id, name: d.name })))
            )
            .catch((e) => setError('Failed to load drugs'))
            .finally(() => setLoadingDrugs(false));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : undefined;
        setForm((f) => ({
            ...f,
            [name]:
                type === 'checkbox'
                    ? checked
                    : // @ts-ignore
                    value,
        }));
    };

    const handleSelectChange = (e: any) => {
        setForm((f) => ({ ...f, drugId: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(form);
        } catch (err: any) {
            setError(err.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingDrugs) {
        return <CircularProgress />;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="drug-select-label">Drug</InputLabel>
                <Select
                    labelId="drug-select-label"
                    value={form.drugId}
                    label="Drug"
                    onChange={handleSelectChange}
                    name="drugId"
                    required
                >
                    {drugs.map((d) => (
                        <MenuItem key={d.id} value={d.id}>
                            {d.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Dosage"
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Frequency"
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={form.prescriptionRequired}
                        onChange={handleChange}
                        name="prescriptionRequired"
                    />
                }
                label="Prescription Required"
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Issued At"
                type="datetime-local"
                name="issuedAt"
                value={form.issuedAt}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="Expires At"
                type="datetime-local"
                name="expiresAt"
                value={form.expiresAt}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 3 }}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                fullWidth
            >
                {submitting ? 'Saving…' : initialData ? 'Update Prescription' : 'Create Prescription'}
            </Button>
        </Box>
    );
};

export default PrescriptionForm;