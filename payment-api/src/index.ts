import { config as dotenvConfig } from "dotenv";
import app from "./api";
import path from "path";

// Read environment's config file  .{NODE_ENV}.env
dotenvConfig({
  path: path.join(__dirname, "..", `.${process.env.NODE_ENV}.env`),
});

export const PORT = +process.env.PORT! || 8080;
export const HOST = process.env.HOST! || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.info(process.pid);
  console.info(`${HOST}:${PORT}`);
});
