export const fetchSongs = async (access_token: string) => {
  // fetch the array of uris of recommended songs
  // if there is no filter data in DB, throw an error
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getRecommandTrackList`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const result = await res.json(); // recommendation results
  return result;
};

export const isTokenValid = async (access_token: string) => {
  // check the validity of exist access token

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token/validate`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (res.status === 200) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
  return false; // return false
};

export const requestLogin = async () => {
  // request login to server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`)
    .then((response) => response.text())
    .then((response) => {
      window.location.replace(response);
    });
};

export const getToken = async (code: string) => {
  let res = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-token?code=${code}`
  );
  return res.then((res) => res.json());
};

export const sendFilter = async (data: any, access_token: string) => {
  // send filter data of user
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/saveUserFilter`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const fetchSample = async () => {
  let res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getFilterInitTrack`);
  return res.then((res) => res.json()).then((result) => result);
};
