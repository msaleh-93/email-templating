import { readdir } from "node:fs/promises";

const server = Bun.serve({
  port: 3210,
  routes: {
    "/api/templates": {
      async GET() {
        return Response.json((await readdir("./public/templates")).sort());
      },
    },
    "/api/data/:template": {
      async GET(req) {
        const template = req.params.template;
        const file = Bun.file(`./public/data/${template}.json`);
        if (!file.exists()) return new Response(null, { status: 404 });
        return Response.json(await file.json());
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
        return new Response(await file.bytes(), {
          headers: { "Content-Type": file.type },
        });
      },
    },
  },
  development: true,
});

console.log(`Listening on ${server.url}`);
