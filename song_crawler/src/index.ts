import { setSpotifyAccessToken } from "./SpotifyAPI";

setSpotifyAccessToken().catch((error) => {
  console.error(error);
});
