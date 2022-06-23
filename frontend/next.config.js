module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:8080",
      },
      {
        source: "/ducks",
        destination: "https://random-d.uk/api/random",
      },
    ];
  };
  return {
    rewrites,
  };
};