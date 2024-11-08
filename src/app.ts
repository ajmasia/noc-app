import { env } from "./config/adapters/envs.adapter";

import { CLI } from "./presentation/cli";

(async () => {
  await main();
})();

async function main() {
  CLI.start();
}
