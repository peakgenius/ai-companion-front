export const getUrl = () => {
  return "http://10.0.2.2:5000/api";
};

export const getTokenExpiryTime = () => {
  return 2 * 60; // 2hour: This value is same as the sessionexpirytime in backend.
};
