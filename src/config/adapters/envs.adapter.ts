import "dotenv/config";
import * as enVars from "env-var";

export const env = {
  PORT: enVars.get("PORT").required().asPortNumber(),
  MAILER_EMAIL: enVars.get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: enVars.get("MAILER_SECRET_KEY").required().asString(),
  PROD: enVars.get("PROD").required().asBool(),
  CRON_JOBS: enVars.get("CRON_JOBS").required().asBool(),
  SEND_EMAIL: enVars.get("SEND_EMAIL").required().asBool(),
};
