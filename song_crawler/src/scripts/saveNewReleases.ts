import "dotenv/config";
import * as SpotifyAPI from "SpotifyAPI";
import { saveDataAsJSON } from "utils";
import format from "date-fns/format";

/**
 * get newly released albums from spotify and save it as json
 * @param offset : default 0, how many songs to skip;
 * @returns {boolean} if there's next page, return true, else return false
 */
const saveNewReleases = async (offset: number): Promise<boolean> => {
  const newReleases = await SpotifyAPI.getNewReleases({
    offset,
  });

  saveDataAsJSON(newReleases, {
    name: `new_releases(${offset}-${offset + 49})_(${format(new Date(), "yyyy-MM-dd")}).json`,
    type: "new_releases",
  });

  return !!newReleases.albums.next;
};

export default saveNewReleases;
