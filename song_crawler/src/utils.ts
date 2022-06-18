import { writeFileSync } from "fs";

type SaveDataAsJSON = (data: any, { name, type }: { name: string; type: string }) => void;

export const saveDataAsJSON: SaveDataAsJSON = (data, { name, type }) => {
  const dataAsString = JSON.stringify(data);
  writeFileSync(`${__dirname}/../data/${type}/${name}`, dataAsString);
};

export const getNewReleasesFilePath = ({ offset, today }: { offset: number; today: string }) => {
  return `${__dirname}/../data/new_releases/new_releases(${offset}-${offset + 49})_(${today}).json`;
};
