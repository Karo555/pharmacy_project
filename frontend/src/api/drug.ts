import api from '../utils/axios';
import { DrugDto } from '../types/drug';

// Protected endpoints (require authentication)
export const listDrugs = async (): Promise<DrugDto[]> => {
    const { data } = await api.get<DrugDto[]>('/drugs');
    return data;
};

export const getDrugById = async (id: number): Promise<DrugDto> => {
    const { data } = await api.get<DrugDto>(`/drugs/${id}`);
    return data;
};

// Public endpoints (no authentication required)
export const getPublicDrugs = async (): Promise<DrugDto[]> => {
    const { data } = await api.get<DrugDto[]>('/public/drugs');
    return data;
};

export const searchPublicDrugs = async (query: string): Promise<DrugDto[]> => {
    const { data } = await api.get<DrugDto[]>(`/public/drugs/search?query=${encodeURIComponent(query)}`);
    return data;
};
