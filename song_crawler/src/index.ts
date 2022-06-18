import saveNewReleases from "scripts/saveNewReleases";
import setSpotifyAccessToken from "scripts/setSpotifyAccessToken";
import reader from "readline-sync";
import format from "date-fns/format";
import getNewReleasedAlbumIds from "scripts/getNewReleaseAlbumIds";
import isEmpty from "lodash/isEmpty";

const todayDefault = format(new Date(), "yyyy-MM-dd");

const main = async () => {
  console.log("Setting your spotify access token...");
  await setSpotifyAccessToken();

  const todayInput = reader.question(
    `Enter today's date in (yyyy-MM-dd) format. default date is : ${todayDefault}`
  );
  const today = isEmpty(todayInput) ? todayDefault : todayInput;

  const job = reader.question(
    `Which job do you wanna do?\n1.get New Releases-(${today}).\n2.get New Released Album Ids-(${today})\n`
  );

  switch (job) {
    case "1": {
      saveNewReleases(today);
      break;
    }
    case "2": {
      const albumIds = await getNewReleasedAlbumIds(today);
      console.log(albumIds);
      break;
    }
    default: {
      console.error("Invalid answer.");
    }
  }
};

main();
