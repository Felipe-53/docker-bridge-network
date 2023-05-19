import fastify from "fastify";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL env var not defined");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();

  const app = fastify({
    logger: true,
  });

  app.get("/", async () => {
    const response = await client.query(`SELECT * FROM my_table`);

    return { rows: response.rowCount };
  });

  await app.listen({
    port: 3500,
    host: "0.0.0.0",
  });
}

await main();
