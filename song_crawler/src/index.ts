import getArtistMap from "scripts/getArtistMap";
import getNewReleasedAlbumIds from "scripts/getNewReleasedAlbumIds";
import getNewReleasedTrackIds from "scripts/getNewReleasedTrackIds";
import getAudioInfos from "scripts/getAudioInfos";
import setSpotifyAccessToken from "scripts/setSpotifyAccessToken";
import getTracks from "scripts/getTracks";
import saveAudioInfos from "scripts/saveAudioInfos";

const main = async () => {
  await setSpotifyAccessToken();

  // new releases에서 출시 날짜가 어제랑 동일한 것 찾아서 배열로 해당 앨범 id 저장
  const newlyReleasedAlbumIds = await getNewReleasedAlbumIds();

  // 저장한 앨범 id를 가지고 앨범 조회 해서 수록곡 트랙 id 저장
  const newReleasedTrackIds = await getNewReleasedTrackIds(newlyReleasedAlbumIds);

  const newReleasedTracks = await getTracks(newReleasedTrackIds);

  // 아티스트 정보 맵 생성하기
  const artistMap = await getArtistMap(newReleasedTracks);

  // 수록곡 트랙 id를 가지고 audio_features 구하기
  const audioInfos = await getAudioInfos(newReleasedTracks, artistMap);
  // 기존 데이터셋을 가져온다음에 새로운 데이터 추가해서 저장.
  saveAudioInfos(audioInfos);
};

main();
