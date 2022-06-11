import readLine from "readline";
import "dotenv/config";
import saveNewReleases from "scripts/saveNewReleases";
import setSpotifyAccessToken from "scripts/setSpotifyAccessToken";

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  console.log("Setting your spotify access token...");
  await setSpotifyAccessToken();

  rl.question(`Which job do you wanna do?\n 1. get New Releases.\n`, async (answer) => {
    switch (answer) {
      case "1": {
        let offset = 0;
        while (1) {
          const hasNext = await saveNewReleases(offset);
          if (!hasNext) break;
          offset += 50;
        }
        rl.close();
        break;
      }
      default: {
        console.error("Invalid answer.");
        rl.close();
      }
    }
  });
};

main();
