import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// In `npm run dev`, serve POST /api/contact with the same handler Vercel runs in production.
function devApi() {
  return {
    name: "dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res) => {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        req.body = raw;
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
          return res;
        };
        try {
          const { default: handler } = await server.ssrLoadModule("/api/contact.js");
          await handler(req, res);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Dev server error" });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Expose server-only vars (RESEND_*, CONTACT_TO_EMAIL) from .env to the dev API.
  // These are not prefixed with VITE_, so they never reach the browser bundle.
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "CONTACT_TO_EMAIL"]) {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [react(), devApi()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
