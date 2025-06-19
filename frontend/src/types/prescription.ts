/**
 * The shape of a prescription as returned by the backend.
 */
export interface PrescriptionDTO {
    id: number;
    userId: number;
    drugName: string;
    dosage: string;
    frequency: string;
    prescriptionRequired: boolean;
    issuedAt: string;   // ISO datetime string
    expiresAt: string;  // ISO datetime string
}

/**
 * Payload for creating a new prescription.
 */
export interface PrescriptionCreateRequestDTO {
    drugId: number;
    dosage: string;
    frequency: string;
    prescriptionRequired: boolean;
    issuedAt: string;   // ISO datetime string
    expiresAt: string;  // ISO datetime string
}

/**
 * Payload for updating an existing prescription.
 * Same fields as create, but used in PUT.
 */
export type PrescriptionUpdateRequest = PrescriptionCreateRequestDTO;