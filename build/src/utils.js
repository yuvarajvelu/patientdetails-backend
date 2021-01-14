"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => {
    return text instanceof String || typeof text === 'string';
};
const isDate = (dob) => {
    return Boolean(Date.parse(dob));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Invalid or missing name, ${name}`);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || ssn.length !== 11) {
        throw new Error(`Invalid or missing ssn. ${ssn}`);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Invalid or missing occupation, ${occupation}`);
    }
    return occupation;
};
const parseDateOfBirth = (dob) => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error(`Invalid or missing date of birth, ${dob}`);
    }
    return dob;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Invalid or missing gender, ${gender}`);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object) => {
    const newEntry = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender)
    };
    return newEntry;
};
exports.default = toNewPatientEntry;
