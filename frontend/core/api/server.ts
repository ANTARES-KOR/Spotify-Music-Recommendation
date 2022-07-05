export const fetchSongs = async (access_token: string) => {
  // fetch the array of uris of recommended songs
  // if there is no filter data in DB, throw an error
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/getRecommandTrackList`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   }
  // );
  // const result = await res.json(); // recommendation results
  const tmpResult = [
    {
      id: null,
      title: "butter",
      uri: "spotify:track:4saklk6nie3yiGePpBwUoc",
      artistName: "BTS",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2733deb4b0115410a85afe31c29",
      contentLength: 199054,
    },
    {
      id: null,
      title: "Oasis",
      uri: "spotify:track:4sa8O4AwMja6r1Enu35Fmz",
      artistName: "Crush",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b273c619210778ee5aad619703cd",
      contentLength: 191279,
    },
    {
      id: null,
      title: "FANCY",
      uri: "spotify:track:60zxdAqWtdDu0vYsbXViA7",
      artistName: "TWICE",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b273f917c68dd4a3a36ec77f06ec",
      contentLength: 213886,
    },
    {
      id: null,
      title: "Every End of the Day",
      uri: "spotify:track:5m2tbM2w8mG76uwFgla2iF",
      artistName: "IU",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2739d991c33eee30c62473c22a8",
      contentLength: 242207,
    },
    {
      id: null,
      title: "I Am You, You Are Me",
      uri: "spotify:track:75ai0ibymmqyCyaxwZuhnu",
      artistName: "ZICO",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b273e0124c9b7f7ec870a121a4f5",
      contentLength: 213252,
    },
  ];
  return tmpResult;
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
  return res.then((res) => {
    return res.json();
  });
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
