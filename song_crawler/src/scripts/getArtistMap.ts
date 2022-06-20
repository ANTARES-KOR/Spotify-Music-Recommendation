import { Artist, SpotifyAPI, CompactTrack } from "SpotifyAPI";
import * as _ from "lodash";

const getArtistMap = async (tracks: CompactTrack[]): Promise<Map<string, Artist>> => {
  const artistIds = tracks.map((track) => track.artists[0].id);

  const artistIdchunks = _.chunk(artistIds, 50);

  const artist_datas = await Promise.all(
    artistIdchunks.map(async (chunk) => {
      const res = await SpotifyAPI.getArtists({ artistIds: chunk });
      return res?.artists;
    })
  );

  const artists = artist_datas.flat().filter(Boolean);

  const artistMap = new Map();

  artists.forEach((artist) => {
    if (artist) {
      artistMap.set(artist.id, artist);
    }
  });

  return artistMap;
};

export default getArtistMap;
