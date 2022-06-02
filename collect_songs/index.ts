import readline from "readline";
import fs from "fs";
import path from "path";
import SpotifyAPI from "./api/SpotifyAPI";

const __dirname = path.resolve();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveData = (data: any) => {
  const json = JSON.stringify(data, null, 2);
  const file = `${__dirname}/data/genre-seeds.json`;
  fs.writeFileSync(file, json);
};

/*
rl.question("get Offset of New Releases: ", (offset: string) => {
  const offsetNum = parseInt(offset, 10);

  rl.question("get Access Token: ", (token: string) => {
    SpotifyAPI.getNewReleases(offsetNum, token)
      .then((albums: any) => {
        console.log(albums);
        saveData(albums, offsetNum);
      })
      .catch((err: Error) => {
        console.error(err);
        rl.close();
      });
  });
});

rl.question("get Access Token: ", (token: string) => {
  SpotifyAPI.getAudioAnalysis("7fYRg3CEbk6rNCuzNzMT06", token)
    .then((data: any) => {
      console.log(data);
      saveData(data);
    })
    .catch((err: Error) => {
      rl.close();
    });
});
*/

rl.question("get Access Token: ", (token: string) => {
  SpotifyAPI.getGenreSeeds(token)
    .then((data: any) => {
      console.log(data);
      saveData(data);
    })
    .catch((err: Error) => {
      rl.close();
    });
});
