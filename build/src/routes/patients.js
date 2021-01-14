"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.get('/:id', (req, res) => {
    console.log("hi");
    const id = req.params.id;
    res.send(patientService_1.default.getIndividualPatientData(id));
});
router.post('/', (req, res) => {
    try {
        const newEntry = utils_1.default(req.body);
        const addedEntry = patientService_1.default.addEntry(newEntry);
        res.send(addedEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
