const daysAgo = (day: number) =>
  new Date(new Date().setDate(new Date().getDate() - day));

export default daysAgo;
