import JamClient from "jmap-jam";

import { logger } from "./logger.js";

const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") ?? [];
const bearerToken = process.env.FASTMAIL_TOKEN!;

let jam: JamClient;
let accountId: string;

async function init() {
  if (jam) {
    return;
  }

  if (!bearerToken) {
    return;
  }

  jam = new JamClient({
    bearerToken,
    sessionUrl: "https://api.fastmail.com/jmap/session",
  });

  accountId = await jam.getPrimaryAccount();
}

async function listIdentities() {
  if (!accountId) {
    logger.error("FastMail not initialized - accountId missing");
    throw new Error("FastMail service not initialized");
  }

  const [account] = await jam.api.Identity.get({ accountId });
  const identities = account.list;

  if (!allowedDomains.length) {
    return identities;
  }

  return identities.filter((identity) => {
    const domain = identity.email.split("@")[1];
    return allowedDomains.includes(domain);
  });
}

export const fastmail = { init, listIdentities };
