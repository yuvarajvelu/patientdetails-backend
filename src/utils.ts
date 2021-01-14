/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntryDetails, LeaveInfo } from './types';

const isString = (text : any) : text is string => {
    return text instanceof String || typeof text === 'string';
};

const isDate = (dob : string) : boolean => {
    return Boolean(Date.parse(dob));
};

const isGender = (gender: any) : gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseName = (name: any) : string => {
    if(!name || !isString(name)) {
        throw new Error(`Invalid or missing name, ${name}`);
    }
    return name;
};

const parseSsn = (ssn : any) : string => {
    if(!ssn || !isString(ssn) || ssn.length !== 11) {
        throw new Error(`Invalid or missing ssn. ${ssn}`);
    }
    return ssn;
};

const parseOccupation = (occupation: any) : string => {
    if(!occupation || !isString(occupation)) {
        throw new Error(`Invalid or missing occupation, ${occupation}`);
    }
    return occupation;
};

const parseDateOfBirth = (dob: any) : string => {
    if(!dob || !isString(dob) || !isDate(dob)) {
        throw new Error(`Invalid or missing date of birth, ${dob}`);
    }
    return dob;
};

const parseGender = (gender: any) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error(`Invalid or missing gender, ${gender}`);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any) : NewPatientEntry => {
    const newEntry = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender)
    };

    return newEntry;
};



const parseStringEntry = (text: any): string => {
    if(!text || !isString(text)) {
        throw new Error(`Invalid or missing name, ${text}`);
    }
    return text;
};

const parseDateEntry = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error(`Invalid or missing date, ${date}`);
    }
    return date;
};


const parseCodeEntry = (code: any): string[] | undefined => {
    if(!code) {
        return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    else if(code.map((c: string) => isString(c)).includes("false")) {
        throw new Error(`Invalid code, ${code}`);
    }
    return code as string[];
};

const parseHealthCheckRating = (rating: any): number => {
    if(rating > 3 || rating < 0) {
        throw new Error(`Missing or invalid rating, ${rating}`);
    }
    return rating as number;
};

const assertNever = (value: any): never => {
    throw new Error(`Wrong input ${value}`);
};

type OccupationalHealthcare = "OccupationalHealthcare";
const parseOccupationType = (text: any): OccupationalHealthcare => {
    return text as OccupationalHealthcare;
};

type Hospital = "Hospital";
const parseHospitalType = (text: any): Hospital => {
    return text as Hospital;
};

type HealthCheck = "HealthCheck";
const parseHealthType = (text: any): HealthCheck => {
    return text as HealthCheck;
};

const parseSickDate = (duration: any): LeaveInfo | undefined => {
    if(!duration) {
        return undefined;
    } else if(!isDate(duration.startDate) && !isDate(duration.endDate)) {
        throw new Error(`Invalid dates ${duration}`);
    }
    return duration as LeaveInfo;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntryDetails = (object: any) : NewEntryDetails => {
    switch(object.type) {
        case "OccupationalHealthcare": 
            const occupationalEntry = {
                description: parseStringEntry(object.description),
                date: parseDateEntry(object.date),
                specialist: parseStringEntry(object.specialist),
                diagnosisCodes: parseCodeEntry(object.diagnosisCodes),
                type: parseOccupationType(object.type),  
                employerName: parseStringEntry(object.employerName),
                sickLeave: parseSickDate(object.sickLeave)
            };
            return occupationalEntry;
        case "Hospital":
            const hospitalEntry = {
                description: parseStringEntry(object.description),
                date: parseDateEntry(object.date),
                specialist: parseStringEntry(object.specialist),
                type: parseHospitalType(object.type),  
                diagnosisCodes: parseCodeEntry(object.diagnosisCodes),
                discharge: {
                    date: parseDateEntry(object.discharge.date),
                    criteria: parseStringEntry(object.discharge.criteria)
                }
            };
            return hospitalEntry;
        case "HealthCheck":
            const healthEntry = {
                description: parseStringEntry(object.description),
                date: parseDateEntry(object.date),
                specialist: parseStringEntry(object.specialist),
                diagnosisCodes: parseCodeEntry(object.diagnosisCodes),
                type: parseHealthType(object.type),  
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return healthEntry;
        default:
            return assertNever(object);
    }
};

export default toNewPatientEntry;