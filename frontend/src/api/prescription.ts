import api from 'axios';
import {
    PrescriptionDto,
    PrescriptionCreateRequest,
    PrescriptionUpdateRequest,
} from '../types/prescription';

export const listPrescriptions = async (): Promise<PrescriptionDto[]> => {
    const { data } = await api.get<PrescriptionDto[]>('/prescriptions');
    return data;
};

export const getPrescriptionById = async (
    id: number
): Promise<PrescriptionDto> => {
    const { data } = await api.get<PrescriptionDto>(`/prescriptions/${id}`);
    return data;
};

export const createPrescription = async (
    payload: PrescriptionCreateRequest
): Promise<PrescriptionDto> => {
    const { data } = await api.post<PrescriptionDto>(
        '/prescriptions',
        payload
    );
    return data;
};

export const updatePrescription = async (
    id: number,
    payload: PrescriptionUpdateRequest
): Promise<PrescriptionDto> => {
    const { data } = await api.put<PrescriptionDto>(
        `/prescriptions/${id}`,
        payload
    );
    return data;
};

export const deletePrescription = async (id: number): Promise<void> => {
    await api.delete(`/prescriptions/${id}`);
};