"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitivePatientData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        gender,
        dateOfBirth,
        occupation,
    }));
};
const getIndividualPatientData = (id) => {
    const patientData = patients_1.default.find(p => p.id === id);
    return patientData;
};
const addEntry = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuid_1.v4() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getNonSensitivePatientData, addEntry, getIndividualPatientData
};
