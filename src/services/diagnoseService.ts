import { diagnoseDetails } from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getDetails = (): Array<DiagnoseEntry> => {
    return diagnoseDetails;
};

export default {
    getDetails,
};