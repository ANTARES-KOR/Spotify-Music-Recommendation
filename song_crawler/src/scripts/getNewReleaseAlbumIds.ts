import { readFileSync } from "fs";
import { getNewReleasesFilePath } from "utils";
import type { Album } from "types/spotify";

const getNewReleasedAlbumIds = async (today: string): Promise<string[]> => {
  let offset = 0;
  let newReleasedAlbumIds: string[] = [];
  while (1) {
    try {
      const newReleases = JSON.parse(
        readFileSync(getNewReleasesFilePath({ offset, today }), "utf-8")
      );
      const albumIds = newReleases.albums.items.map((item: Album) => item.id);
      newReleasedAlbumIds = [...newReleasedAlbumIds, ...albumIds];
    } catch {
      break;
    } finally {
      offset += 50;
    }
  }
  return newReleasedAlbumIds;
};

export default getNewReleasedAlbumIds;
