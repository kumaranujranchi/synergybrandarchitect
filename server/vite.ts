import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as any,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        // Don't exit on SSR errors - let the graceful fallback handle them
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Transform HTML through Vite (handles HMR scripts, etc.)
      // Wrapped in try-catch: if a Vite plugin fails to parse index.html (e.g. JSON-LD script),
      // we fall through to the raw template which is fine for SSR rendering.
      try {
        template = await vite.transformIndexHtml(url, template);
      } catch (transformErr) {
        console.warn("[SSR] transformIndexHtml failed, using raw template:", (transformErr as Error).message?.slice(0, 80));
      }

      // Load the server entry point
      const { render } = await vite.ssrLoadModule(
        path.resolve(__dirname, "..", "client", "src", "entry-server.tsx")
      );

      // Render the app to HTML and head tags
      const rendered = await render(url);

      // Inject the rendered content into the template safely
      const html = template
        .replace(`<!--app-html-->`, () => rendered.html)
        .replace(`<!--app-head-->`, () => rendered.head);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      const err = e as Error;
      console.error("[SSR] Render error:", err.message);
      vite.ssrFixStacktrace(err);
      // Graceful fallback: send the plain HTML and let the client handle rendering
      try {
        const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch {
        next(e);
      }
    }
  });
}

export async function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "client");
  const serverPath = path.resolve(__dirname, "..", "dist", "server");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets from dist/client
  app.use(express.static(distPath, { index: false }));

  // Handle SSR for all other routes
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html from dist/client
      let template = await fs.promises.readFile(
        path.resolve(distPath, "index.html"),
        "utf-8",
      );

      // 2. Load the pre-built server entry
      // We use import() to dynamically load the ESM module
      const { render } = await import(path.resolve(serverPath, "entry-server.js"));

      // 3. Render the app
      const rendered = await render(url);

      // 4. Inject into template
      const html = template
        .replace(`<!--app-html-->`, rendered.html)
        .replace(`<!--app-head-->`, rendered.head);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      console.error("SSR Error:", e);
      // Fallback to sending the raw index.html if SSR fails
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
