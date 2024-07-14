export default {
  saltWorkFactor: 10,
  accessTokenExpires: "15m",
  refreshTokenExpires: "1y",
  scheduler: { hour: 12, minute: 0, dayOfWeek: 0 },
  compression: { level: 6, threshold: 100 * 1000 },
  limit: "16kb",
};
