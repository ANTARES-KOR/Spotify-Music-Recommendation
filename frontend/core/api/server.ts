export const fetchSongs = async (access_token: string) => {
  // fetch the array of uris of recommended songs
  // if there is no filter data in DB, throw an error
  try {
    const res = await fetch("http://localhost:8080/api/getRecommandTrackList", {
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

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/token/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
  return true; // return false
};

export const requestLogin = async () => {
  // request login to server
  localStorage.removeItem("access_token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/login`)
    .then((response) => response.text())
    .then((response) => {
      window.location.replace(response);
    });
};

export const getToken = async (code: string) => {
  console.log("get token occured");
  let res = fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/get-token?code=${code}`);
  return res.then((res) => res.json());
};

export const sendFilter = async (data: any, access_token: string) => {
  // send filter data of user
  const res = await fetch("url", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const fetchSample = async () => {
  let res = fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/getFilterInitTrack`);
  return res.then((res) => res.json()).then((result) => result);
};
