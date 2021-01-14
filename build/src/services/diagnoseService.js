"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = require("../../data/diagnoses");
const getDetails = () => {
    return diagnoses_1.diagnoseDetails;
};
exports.default = {
    getDetails,
};
