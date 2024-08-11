import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import UserRoute from "./routes/UserRoute";
import ProductRoute from "./routes/ProductRoute";
import CategoryRoute from "./routes/CategoryRoute";
import Mux from "@mux/mux-node";
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api", UserRoute);
app.use("/api", ProductRoute);
app.use("/api", CategoryRoute);

app.post("/api/store-attachments", async (req: Request, res: Response) => {
  const asset = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      max_resolution_tier: "1080p",
      input: [
        {
          generated_subtitles: [
            {
              language_code: "en",
              name: "Indonesia CC",
            },
          ],
        },
      ],
      encoding_tier: "smart",
    },
    test: false,
    cors_origin: "*",
  });
  return res.json(asset);
});
app.get("/api/get-attachments", async (req: Request, res: Response) => {
  const { uploadId } = req.query as { uploadId: string };
  if (uploadId) {
    const asset = await mux.video.uploads.retrieve(uploadId);
    if (asset) {
      const playback = await mux.video.assets.createPlaybackId(
        asset.asset_id as string,
        {
          policy: "public",
        }
      );
      return res.json(playback.id);
    }
    return res.json({ error: "error" });
  }
  res.json({ error: "error" });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
