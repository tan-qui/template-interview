// import config
import { config } from "dotenv";
// init lib
import express, { json, urlencoded } from "express";
import cors from "cors";
import { createServer } from "http";
import i18n from './src/Langs/i18n';
// import routes
import chatRouter from "./src/Routes/Public/ChatRoutes";

// load environment
const envFile = `.env.${process.env.NODE_ENV}`;
config({ path: envFile });

// app
const app = express();

// origin
app.use(cors({ origin: "*", }));

app.use(i18n.init);

// express
const maxRequestSize = 10 * 1024 * 1024; // 10MB
app.use(json({ limit: maxRequestSize }));
app.use(urlencoded({ extended: true, limit: maxRequestSize }));

// setting locale
app.use((req: any, res: any, next: any) => {
  // setting locale
  const lang = req.headers['lang'] || "en";
  i18n.setLocale(lang);
  next();
});

app.get('/health', (req: any, res: any) => {
  res.send('Service chat AI is running 2026/02/05 01:00:00');
});

// public route
app.use("/chat", chatRouter);

// port
const port = process.env.PORT || 8082;

// server
const server = createServer(app);

// app listen
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
