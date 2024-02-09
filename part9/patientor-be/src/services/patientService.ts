import patientsData from "../../data/patients";
import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatient,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

let patients: PatientEntry[] = patientsData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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

const addNewEntries = (_id: string, newEntry: Entry) => {
  const id = uuid();
  const newEntries = {
    id,
    ...newEntry,
  };
  patients = patients.map((p) =>
    p.id === _id ? { ...p, entries: p.entries.concat(newEntries) } : p
  );
  return newEntries;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addNewEntries,
};
