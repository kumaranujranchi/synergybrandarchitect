import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Get from env or use default
const VITE_CONVEX_URL = process.env.VITE_CONVEX_URL || "https://mellow-butterfly-809.convex.cloud";
console.log("Using URL:", VITE_CONVEX_URL);
const client = new ConvexHttpClient(VITE_CONVEX_URL);

async function run() {
  try {
    const res = await client.mutation("auth:login", {
      email: "anuj@synergybrandarchitect.in",
      password: "Anuj@1234"
    });
    console.log("SUCCESS:", res);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

run();
