const saveNewReleasedTracks = async (albumIds: string[]) => {
  const newReleasedTracks = await Promise.all(
    albumIds.map(async (albumId) => {
      const tracks = await getAlbumTracks(albumId);
      return tracks.items;
    })
  );
};
