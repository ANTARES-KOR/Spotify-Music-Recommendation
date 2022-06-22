import { Artist, AudioFeature, SpotifyAPI, Track } from "SpotifyAPI";
import * as _ from "lodash";

const getAudioInfos = async (tracks: Track[], artistMap: Map<string, Artist>) => {
  const trackChunks = _.chunk(tracks, 50);

  const audio_features_responses = await Promise.all(
    trackChunks.map(async (trackChunk) => {
      const response = await SpotifyAPI.getAudioFeatures({
        trackIds: trackChunk.map((track) => track.id),
      });
      return response?.audio_features;
    })
  );

  const audioInfos = audio_features_responses
    .flatMap((features) => {
      if (!features) return null;
      return features;
    })
    .filter(Boolean)
    .map((features, index) => {
      const { mode, analysis_url, track_href, type, ...feature } = features as AudioFeature;

      return {
        artist_name: tracks[index].artists[0].name,
        track_name: tracks[index].name,
        album_name: tracks[index].album.name,
        artist_genre: artistMap.get(tracks[index].artists[0].id)?.genres ?? [],
        artist_popularity: artistMap.get(tracks[index].artists[0].id)?.popularity,
        track_popularity: tracks[index].popularity,
        artist_followers: artistMap.get(tracks[index].artists[0].id)?.followers.total,
        release_date: tracks[index].album.release_date,
        ...feature,
      };
    });

  // saveDataAsJSON(audioInfos, { name: "audio_features.json", type: "tracks" });

  return audioInfos;
};

export default getAudioInfos;
