import * as SpotifyAPI from "SpotifyAPI";
import { saveDataAsJSON } from "utils";

/**
 * get newly released albums from spotify and save it as json
 */
const saveNewReleases = async (today: string) => {
  let offset = 0;

  while (1) {
    const newReleases = await SpotifyAPI.getNewReleases({
      offset,
    });

    saveDataAsJSON(newReleases, {
      name: `new_releases(${offset}-${offset + 49})_(${today}).json`,
      type: "new_releases",
    });
    if (!!newReleases.albums.next) {
      offset += 50;
    } else {
      break;
    }
  }
};

export default saveNewReleases;
