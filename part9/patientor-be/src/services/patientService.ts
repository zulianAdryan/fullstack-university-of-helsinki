import patientsData from "../../data/patients";
import { NewPatientEntry, PatientEntry, PatientWithoutSSN } from "../types";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientsData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSsnEntries = (): PatientWithoutSSN[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    getEntries,
    id,
    name,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSsnEntries, addPatient };
