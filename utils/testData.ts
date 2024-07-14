import config from "../config/config";

const taskBody = {
  title: "Test",
  description: "Test",
  date: new Date(Date.now()),
  complete: "ToDo",
  users: [config.userId],
};
const userBody = {
  name: "Test Dummie",
  email: "test@example.com",
  password: "password",
  role: "user",
  loggedIn: new Date(Date.now()),
  seconds: 0,
};

export default { taskBody, userBody };
