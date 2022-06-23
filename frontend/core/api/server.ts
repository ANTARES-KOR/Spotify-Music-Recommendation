export const fetchSongs = async (access_token: string) => {
  // fetch the array of uris of recommended songs
  // if there is no filter data in DB, throw an error
  try {
    const res = await fetch("url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const result = await res.json(); // recommendation results
    return result;
  } catch (err) {
    throw new Error(`Failed to fetch recommendation results ${err}`);
  }
};

export const isTokenValid = async (access_token: string) => {
  // check the validity of exist access token
  const res = await fetch("url", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (res.status === 200) {
    return true;
  }
  return true; // return false
};

export const requestLogin = () => {
  // request login to server
};

export const sendFilter = () => {
  // send filter data of user
};
