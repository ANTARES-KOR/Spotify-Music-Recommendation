import { writeFileSync } from "fs";

type SaveDataAsJSON = (data: any, { name, type }: { name: string; type: string }) => void;

export const saveDataAsJSON: SaveDataAsJSON = (data, { name, type }) => {
  const dataAsString = JSON.stringify(data);
  writeFileSync(`${__dirname}/../data/${type}/${name}`, dataAsString);
};
