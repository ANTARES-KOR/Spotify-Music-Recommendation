import { SpotifyAPI, Track } from "SpotifyAPI";

const getTracks = async (trackIds: string[]): Promise<Track[]> => {
  const tracks = await Promise.all(
    trackIds.map(async (trackId) => {
      const track = await SpotifyAPI.getTrack({ trackId });
      return track;
    })
  );

  return tracks.filter(Boolean) as Track[];
};

export default getTracks;
