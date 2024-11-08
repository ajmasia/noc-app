import { CLI } from "./presentation/cli";

(async () => {
  await main();
})();

async function main() {
  CLI.start();
}
