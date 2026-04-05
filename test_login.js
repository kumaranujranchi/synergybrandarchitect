const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient("https://mellow-butterfly-809.convex.cloud");

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
