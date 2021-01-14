import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntryDetails } from '../utils';

const router = express.Router();

router.get('/',(_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id',(req, res) => {
    const id = req.params.id;
    res.send(patientService.getIndividualPatientData(id));
});

router.post("/:id/entries", (req,res) => {
    try {
        const id = req.params.id;
        const newEntry = toNewEntryDetails(req.body);
        res.send(patientService.addEntryDetails(id, newEntry));
    } catch(e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
    
});

router.post('/',(req,res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newEntry);
        res.send(addedEntry);
    } catch(e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default router;