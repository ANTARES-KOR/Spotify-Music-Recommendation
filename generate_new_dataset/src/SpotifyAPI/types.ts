export type CompactArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

export type CompactAlbum = {
  album_type: "album" | "single" | "compilation";
  artists: CompactArtist[];
  available_markets: string[];
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Record<string, unknown>[];
  name: string;
  /**
   * format: yyyy-MM-dd
   */
  release_date: string;
  release_date_precision: "day" | "month" | "year";
  total_tracks: number;
  type: "album";
  uri: string;
};

export type CompactTrack = {
  artists: CompactArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  preview_url: string | null;
  restrictions: {
    reason: string;
  };
  track_number: number;
  type: "track";
  uri: string;
};

export type Track = CompactTrack & {
  album: CompactAlbum;
  external_ids: Record<string, string>;
  linked_from: Record<string, string>;
  name: string;
  popularity: number;
};

export type AlbumTracksResponse = {
  href: string;
  items: CompactTrack[];
  limit: number;
  next: string;
  offset: number;
  total: number;
};

export type AudioFeature = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: "audio_features";
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};

export type AudioFeaturesResponse = {
  audio_features: AudioFeature[];
};

export type Artist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Record<string, unknown>[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type ArtistsResponse = {
  artists: Artist[];
};
