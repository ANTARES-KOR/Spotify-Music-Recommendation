import { AudioFeature } from "SpotifyAPI";

export type Album = {
  album_type: "album" | "single";
  artists: any[];
  available_markets: string[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: any[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
};

export type AudioInfo = Omit<AudioFeature, "track_href" | "type" | "mode" | "analysis_url"> & {
  artist_name: string;
  artist_genre: string[];
  release_date: string;
  track_name: string;
};
