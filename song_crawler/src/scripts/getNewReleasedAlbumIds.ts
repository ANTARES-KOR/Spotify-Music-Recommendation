import { SpotifyAPI, CompactAlbum } from "SpotifyAPI";
import { getTargetReleaseDate } from "utils";

const getNewReleasedAlbumIds = async (): Promise<string[]> => {
  const target_date = getTargetReleaseDate();

  const newReleases = await SpotifyAPI.getNewReleases({ offset: 0 });

  const yesterdayReleasedAlbumIds = newReleases.albums.items
    .filter((item: CompactAlbum) => item.release_date === target_date)
    .map((item: CompactAlbum) => item.id);

  return yesterdayReleasedAlbumIds;
};

export default getNewReleasedAlbumIds;
