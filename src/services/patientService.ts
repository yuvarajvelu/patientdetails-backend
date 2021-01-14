import {NewPatientEntry, NonSensitivePatientData, PatientEntry, Patient, NewEntryDetails} from '../types';
import patientEnteries from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientEnteries.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        gender,
        dateOfBirth,
        occupation,
    }));
};

const getIndividualPatientData = (id: string) : Patient => {
    const patientData = patientEnteries.find(p => p.id === id) as Patient;
    return patientData;
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        entries: [],
        ...entry
    };
    patientEnteries.push(newPatientEntry);
    return newPatientEntry;
}; 

const addEntryDetails = (patientId: string, entry: NewEntryDetails): Patient => {
    const patientData = patientEnteries.find(p => p.id === patientId) as Patient;
    const entries = {
        id: uuidv4(),
        ...entry
    };
    patientData.entries.push(entries);
    return patientData;
};

export default {
    getNonSensitivePatientData, addEntry, getIndividualPatientData, addEntryDetails
};