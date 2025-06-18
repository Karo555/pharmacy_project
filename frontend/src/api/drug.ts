import api from '../utils/axios';
import { DrugDto } from '../types/drug';

export const listDrugs = async (): Promise<DrugDto[]> => {
    const { data } = await api.get<DrugDto[]>('/drugs');
    return data;
};

export const getDrugById = async (id: number): Promise<DrugDto> => {
    const { data } = await api.get<DrugDto>(`/drugs/${id}`);
    return data;
};
