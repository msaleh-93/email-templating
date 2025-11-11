import { serve } from "bun";
import { readdir } from "node:fs/promises";

import index from "~/index.html";

const server = serve({
  routes: {
    "/*": index,
    "/:filename": {
      async GET(req) {
        const filename = req.params.filename;
        const file = Bun.file(`./public/${filename}`);
        return (await file.exists())
          ? new Response(await file.bytes(), {
              headers: { "Content-Type": file.type },
            })
          : new Response(null, { status: 404 });
      },
    },
    "/api/templates": {
      async GET() {
        return Response.json((await readdir("./public/templates")).sort());
      },
    },
    "/api/data/:template": {
      async GET(req) {
        const template = req.params.template;
        const file = Bun.file(`./public/data/${template}.json`);
        return (await file.exists())
          ? Response.json(await file.json())
          : new Response(null, { status: 404 });
      },
      async POST(req) {
        const template = req.params.template;
        console.log("Writing data for template:", template);
        const data = await req.json();
        const file = Bun.file(`./public/data/${template}.json`);
        await file.write(JSON.stringify(data, null, 2));
        return new Response(null, { status: 204 });
      },
    },
    "/assets/:filename": {
      async GET(req) {
        const filename = req.params.filename;
        const file = Bun.file(`./public/assets/${filename}`);
        return (await file.exists())
          ? new Response(await file.bytes(), {
              headers: { "Content-Type": file.type },
            })
          : new Response(null, { status: 404 });
      },
    },
    "/templates/:filename": {
      async GET(req) {
        const filename = req.params.filename;
        console.log(">>> /templates/:filename", filename);
        const file = Bun.file(`./public/templates/${filename}`);
        return (await file.exists())
          ? new Response(await file.text(), {
              headers: { "Content-Type": "text/html" },
            })
          : new Response(null, { status: 404 });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
