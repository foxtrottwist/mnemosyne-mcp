import JamClient from "jmap-jam";

import { logger } from "../logger.js";

const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") ?? [];

let client: JamClient;
let accountId: string;

async function getIdentities() {
  if (!accountId) {
    logger.error("FastMail not initialized - accountId missing");
    throw new Error("FastMail service not initialized");
  }

  const [account] = await client.api.Identity.get({ accountId });
  const identities = account.list;

  if (!allowedDomains.length) {
    return identities;
  }

  return identities.filter((identity) => {
    const domain = identity.email.split("@")[1];
    return allowedDomains.includes(domain);
  });
}

async function init() {
  if (client) {
    return;
  }

  client = new JamClient({
    bearerToken: process.env.FASTMAIL_TOKEN ?? "",
    sessionUrl: "https://api.fastmail.com/jmap/session",
  });

  accountId = await client.getPrimaryAccount();
}

export const fastmail = { getIdentities, init };
