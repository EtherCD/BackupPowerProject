import paths from "./paths";
import { StorageType } from "./types";
import fs from "fs";

let storage: StorageType = {
  batteryType: "LeadAcid",
  capacityInAh: 220,
  consumed: 0,
  capacity: 220 * 12,
  voltage: 12.8,
  current: 18.3,
  load: 220,
};

const propertiesToSave: Array<string> = [
  "batteryType",
  "capacityInAh",
  "capacity",
];

export const setPropertyValue = (
  propertyName: keyof StorageType,
  value: any
) => {
  storage[propertyName] = value;
};

export const getStorageDump = () => storage;

export const getPropertyValue = (propertyName: keyof StorageType) =>
  storage[propertyName]
    ? storage[propertyName]
    : (() => {
        throw new Error("Property is not exist");
      })();

export const saveOnDrive = () => {
  let dataToSave: Record<string, any> = {};
  for (const i in propertiesToSave)
    dataToSave[propertiesToSave[i]] = storage[propertiesToSave[i]];

  console.log(dataToSave);

  fs.writeFileSync(paths.storageDump, JSON.stringify(dataToSave, undefined, 2));
};

export const loadFromDrive = () => {
  try {
    const data = fs.readFileSync(paths.storageDump, { flag: "r+" });
    if (!data) return;

    const parsedFile = JSON.parse(data + "");
    if (Object.keys(parsedFile).length === 0) return;

    for (const i in propertiesToSave) storage[i] = parsedFile[i];
  } catch {
    saveOnDrive();
  }
};
