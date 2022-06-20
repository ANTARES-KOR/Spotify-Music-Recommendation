import { isEmpty } from "lodash";
import { AudioInfo } from "types/spotify";
import { saveDataAsCSV } from "utils";

const saveAudioInfos = (audioInfos: AudioInfo[]) => {
  if (isEmpty(audioInfos)) return;

  const keys = Object.keys(audioInfos[0]);
  const values = audioInfos.map((audioInfo) => Object.values(audioInfo));

  const csvString = [keys.join(","), ...values.map((value) => value.join(","))].join("\n");
  saveDataAsCSV(csvString, { name: "audio_infos.csv", type: "audio" });
};

export default saveAudioInfos;
