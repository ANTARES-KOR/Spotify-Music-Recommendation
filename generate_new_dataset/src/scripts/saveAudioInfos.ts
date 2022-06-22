import "dotenv/config";
import { isEmpty } from "lodash";
import { saveDataAsJSON } from "utils";
import type { AudioInfo } from "types/spotify";
import { readDataFromS3, saveDataToS3 } from "./S3scripts";

const FILE_NAME = "dataset";

const parseAudioData = (dataset: any[]) => {
  return dataset.map((item) => ({
    id: item.id,
    artist_name: item.artist_name,
    track_name: item.track_name,
    album_name: item.album_name,
    artist_genre: item.artist_genre,
    release_date: item.release_date,
    artist_popularity: item.artist_popularity,
    track_popularity: item.track_popularity,
    artist_follwers: item.artist_followers,
    danceability: item.danceability,
    energy: item.energy,
    key: item.key,
    loudeness: item.loudeness,
    speechiness: item.speechiness,
    acousticness: item.acousticness,
    instrumentalness: item.instrumentalness,
    liveness: item.liveness,
    valence: item.valence,
    tempo: item.tempo,
    duration_ms: item.duration_ms,
    time_signature: item.time_signature,
    uri: item.uri ?? "",
  }));
};

const saveAudioInfos = async (audioInfos: AudioInfo[]) => {
  if (isEmpty(audioInfos)) return;

  if (process.env.NODE_ENV === "production") {
  }

  const existing_data_raw = await readDataFromS3(FILE_NAME);

  const existing_dataset = JSON.parse(existing_data_raw as string);
  const new_dataset = parseAudioData([...existing_dataset, ...audioInfos]);

  saveDataAsJSON(new_dataset, { name: "new.json", type: "dataset" });

  const new_dataset_json = JSON.stringify(new_dataset);

  const data_location = await saveDataToS3(new_dataset_json, FILE_NAME);

  console.log(data_location);
};

export default saveAudioInfos;
