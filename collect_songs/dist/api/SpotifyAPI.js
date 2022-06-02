import axios from "axios";
const getNewReleases = async (offset, accessToken) => {
    const url = "https://api.spotify.com/v1/browse/new-releases";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            country: "KR",
            limit: 50,
            offset,
        },
    };
    const response = await axios.get(url, config);
    return response.data.albums.items;
};
const getAudioAnalysis = async (id, accessToken) => {
    const url = `https://api.spotify.com/v1/audio-analysis/${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.get(url, config);
    return response.data;
};
const getGenreSeeds = async (accessToken) => {
    const url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.get(url, config);
    return response.data.genres;
};
const SpotifyAPI = {
    getAudioAnalysis,
    getGenreSeeds,
    getNewReleases,
};
export default SpotifyAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9TcG90aWZ5QVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcxQixNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsRUFBRTtJQUNuRSxNQUFNLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztJQUM3RCxNQUFNLE1BQU0sR0FBRztRQUNiLE9BQU8sRUFBRTtZQUNQLGFBQWEsRUFBRSxVQUFVLFdBQVcsRUFBRTtTQUN2QztRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNO1NBQ1A7S0FDRixDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNwQyxDQUFDLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFVLEVBQUUsV0FBbUIsRUFBRSxFQUFFO0lBQ2pFLE1BQU0sR0FBRyxHQUFHLDZDQUE2QyxFQUFFLEVBQUUsQ0FBQztJQUM5RCxNQUFNLE1BQU0sR0FBRztRQUNiLE9BQU8sRUFBRTtZQUNQLGFBQWEsRUFBRSxVQUFVLFdBQVcsRUFBRTtTQUN2QztLQUNGLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztBQUN2QixDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsV0FBbUIsRUFBRSxFQUFFO0lBQ2xELE1BQU0sR0FBRyxHQUFHLGtFQUFrRSxDQUFDO0lBQy9FLE1BQU0sTUFBTSxHQUFHO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLFVBQVUsV0FBVyxFQUFFO1NBQ3ZDO0tBQ0YsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRztJQUNqQixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLGNBQWM7Q0FDZixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==