export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, "ssn" | "entries" >;
export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn: string;
    occupation: string;
}

export type NonSensitivePatientData = Omit<PatientEntry, "ssn">;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NewPatientEntry = Omit<PatientEntry, 'id' | "enteries">;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface LeaveInfo {
    "startDate": string;
    "endDate": string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: LeaveInfo;
}

interface DischargeType {
    "date": string;
    "criteria": string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: DischargeType;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


type NewEntryBase = Omit<BaseEntry, "id">;

interface HealthCheckEntries extends NewEntryBase {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntries extends NewEntryBase  {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: LeaveInfo;
}

interface HospitalEntries extends NewEntryBase {
    type: "Hospital";
    discharge: DischargeType;
}

export type NewEntryDetails = HealthCheckEntries | OccupationalHealthcareEntries | HospitalEntries;