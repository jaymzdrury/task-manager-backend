import config from "./config";
const { ai } = config;
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: ai });

export default groq;
