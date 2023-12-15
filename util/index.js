export const getUrl = () => {
  // return "http://143.198.177.68/api";              //server
  // return "http://10.0.2.2:5000/api";             //android studio
  return "http://127.0.0.1:5000/api";             //ios simulator
  // return "http://localhost:5000/api";            //web
};

export const getTokenExpiryTime = () => {
  return 2 * 60; // 2hour: This value is same as the sessionexpirytime in backend.
};
