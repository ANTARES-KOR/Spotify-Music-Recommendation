import axios from "axios";
import fs from "fs";
import { SpotifyAPI } from "SpotifyAPI";
import { saveDataAsJSON } from "utils";

const saveAndGetSpotifyAccessToken = async () => {
  const token_data = await SpotifyAPI.getSpotifyAccessToken();
  if (token_data) {
    // 서버에서 액세스 토큰 받고 나면 그거 json에 저장하기
    saveDataAsJSON(
      { ...token_data, expires_at: Date.now() + (token_data?.expires_in - 60) * 1000 },
      { name: "spotify_token.json", type: "token" }
    );
    return token_data.access_token;
  }
  return "";
};

const setSpotifyAccessToken = async () => {
  let access_token = "";

  // json에서 데이터 가져오고
  try {
    const token_data_json = fs.readFileSync(
      `${__dirname}/../data/token/spotify_token.json`,
      "utf-8"
    );
    const token_data = JSON.parse(token_data_json);

    if (token_data.expires.at > Date.now()) {
      // 만료되지 않은 경우
      access_token = token_data.access_token;
    } else {
      // 만료된 경우
      access_token = await saveAndGetSpotifyAccessToken();
    }
  } catch {
    // 파일이 없는 경우
    access_token = await saveAndGetSpotifyAccessToken();
  } finally {
    // 액세스 토큰을 axios에 저장해주기
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
};

export default setSpotifyAccessToken;
