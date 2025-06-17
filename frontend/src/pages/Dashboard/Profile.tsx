import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Stack,
    Alert,
    Zoom,
    CircularProgress,
    Divider
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { getProfile, updateProfile, changePassword } from '../../api/auth';
import {
    UserProfileResponseDTO,
    UserProfileUpdateRequestDTO,
    PasswordChangeRequestDTO
} from 'types/auth';
import { useAuth } from 'hooks/useAuth';

const Profile: React.FC = () => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [profile, setProfile] = useState<UserProfileResponseDTO | null>(null);
    const [form, setForm] = useState<UserProfileUpdateRequestDTO>({
        address: '',
        phoneNumber: '',
        paymentMethod: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string,string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
        type: null,
        message: null
    });

    const [pwForm, setPwForm] = useState<PasswordChangeRequestDTO>({ oldPassword: '', newPassword: '' });
    const [pwConfirm, setPwConfirm] = useState('');
    const [pwErrors, setPwErrors] = useState<Record<string,string>>({});
    const [pwSaving, setPwSaving] = useState(false);
    const [pwStatus, setPwStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
        type: null,
        message: null
    });

    // Load profile on mount
    useEffect(() => {
        getProfile()
            .then(data => {
                setProfile(data);
                setForm({
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || '',
                    paymentMethod: data.paymentMethod || ''
                });
            })
            .catch(err => {
                setStatus({ type: 'error', message: err.response?.data?.message || err.message });
            })
            .finally(() => setLoading(false));
    }, []);

    // Handle profile field change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (!value.trim()) {
            setFormErrors(prev => ({ ...prev, [name]: 'Required' }));
        } else {
            setFormErrors(prev => { const p = { ...prev }; delete p[name]; return p; });
        }
    };

    // Submit profile update
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (Object.keys(formErrors).length) return;
        setSaving(true);
        setStatus({ type: null, message: null });
        try {
            const updated = await updateProfile(form);
            setProfile(updated);
            setStatus({ type: 'success', message: 'Profile updated' });
        } catch (err: any) {
            setStatus({ type: 'error', message: err.response?.data?.message || err.message });
        } finally {
            setSaving(false);
        }
    };

    // Handle password change
    const handlePwChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'confirm') {
            setPwConfirm(value);
            setPwErrors(prev => ({ ...prev, confirm: value === pwForm.newPassword ? '' : 'Passwords do not match' }));
        } else {
            setPwForm(prev => ({ ...prev, [name]: value }));
            if (!value) setPwErrors(prev => ({ ...prev, [name]: 'Required' }));
            else setPwErrors(prev => { const p = { ...prev }; delete p[name]; return p; });
        }
    };

    const handlePwSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (pwErrors.oldPassword || pwErrors.newPassword || pwErrors.confirm) return;
        setPwSaving(true);
        setPwStatus({ type: null, message: null });
        try {
            await changePassword(pwForm);
            setPwStatus({ type: 'success', message: 'Password changed' });
            setPwForm({ oldPassword: '', newPassword: '' });
            setPwConfirm('');
        } catch (err: any) {
            setPwStatus({ type: 'error', message: err.response?.data?.message || err.message });
        } finally {
            setPwSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>My Profile</Typography>
            {status.type && (
                <Zoom in>
                    <Alert severity={status.type} sx={{ mb: 2 }} onClose={() => setStatus({ type: null, message: null })}>
                        {status.message}
                    </Alert>
                </Zoom>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        value={profile?.email}
                        InputProps={{ readOnly: true }}
                        fullWidth
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        error={!!formErrors.phoneNumber}
                        helperText={formErrors.phoneNumber}
                        fullWidth
                    />
                    <TextField
                        label="Payment Method"
                        name="paymentMethod"
                        value={form.paymentMethod}
                        onChange={handleChange}
                        error={!!formErrors.paymentMethod}
                        helperText={formErrors.paymentMethod}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" disabled={saving}>
                        {saving ? <CircularProgress size={24} /> : 'Save Profile'}
                    </Button>
                </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>Change Password</Typography>
            {pwStatus.type && (
                <Zoom in>
                    <Alert severity={pwStatus.type} sx={{ mb: 2 }} onClose={() => setPwStatus({ type: null, message: null })}>
                        {pwStatus.message}
                    </Alert>
                </Zoom>
            )}
            <Box component="form" onSubmit={handlePwSubmit} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        value={pwForm.oldPassword}
                        onChange={handlePwChange}
                        error={!!pwErrors.oldPassword}
                        helperText={pwErrors.oldPassword}
                        fullWidth
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={pwForm.newPassword}
                        onChange={handlePwChange}
                        error={!!pwErrors.newPassword}
                        helperText={pwErrors.newPassword}
                        fullWidth
                    />
                    <TextField
                        label="Confirm New Password"
                        name="confirm"
                        type="password"
                        value={pwConfirm}
                        onChange={handlePwChange}
                        error={!!pwErrors.confirm}
                        helperText={pwErrors.confirm}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" disabled={pwSaving}>
                        {pwSaving ? <CircularProgress size={24} /> : 'Change Password'}
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Profile;