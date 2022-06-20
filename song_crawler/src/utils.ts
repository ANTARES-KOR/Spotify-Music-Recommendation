import { writeFileSync } from "fs";
import format from "date-fns/format";
import sub from "date-fns/sub";

type SaveDataAsJSON = (data: any, { name, type }: { name: string; type: string }) => void;

export const saveDataAsJSON: SaveDataAsJSON = (data, { name, type }) => {
  const dataAsString = JSON.stringify(data);
  writeFileSync(`${__dirname}/../data/${type}/${name}`, dataAsString);
};

export const saveDataAsCSV = (data: string, { name, type }: { name: string; type: string }) => {
  writeFileSync(`${__dirname}/../data/${type}/${name}`, data);
};

export const getNewReleasesFilePath = ({ offset, today }: { offset: number; today: string }) => {
  return `${__dirname}/../data/new_releases/new_releases(${offset}-${offset + 49})_(${today}).json`;
};

export const getTargetReleaseDate = () => {
  process.env.TZ = "Asia/Seoul";

  // const release_date = format(sub(new Date(), { days: 1 }), "yyyy-MM-dd");
  const release_date = format(new Date("2022-06-01"), "yyyy-MM-dd");

  return release_date;
};
