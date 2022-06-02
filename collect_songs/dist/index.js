import readline from "readline";
import fs from "fs";
import path from "path";
import SpotifyAPI from "./api/SpotifyAPI.js";
const __dirname = path.resolve();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const saveData = (data) => {
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
rl.question("get Access Token: ", (token) => {
  SpotifyAPI.getGenreSeeds(token)
    .then((data) => {
      console.log(data);
      saveData(data);
    })
    .catch((err) => {
      rl.close();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLFVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDakMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0NBQ3ZCLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7SUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQztJQUNsRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkJFO0FBRUYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQ2xELFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQzVCLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==
