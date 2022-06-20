import { SpotifyAPI } from "SpotifyAPI";

const getNewReleasedTrackIds = async (albumIds: string[]): Promise<string[]> => {
  const tracks = await Promise.all(
    albumIds.map(async (albumId) => {
      const response = await SpotifyAPI.getAlbumTracks({ albumId });
      return response?.items;
    })
  );

  const newReleasedTrackIds = tracks
    .flatMap((track) => {
      if (!track) return null;
      return track.map((item) => item.id);
    })
    .filter(Boolean);

  return newReleasedTrackIds as string[];
};

export default getNewReleasedTrackIds;
