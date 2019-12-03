import "dotenv/config";

import { createTestClient } from "@pablosz/apollo-server-integration-testing";

import { apolloServer } from "../";

export const apolloTestClient = ({
  headers,
}: { headers?: Record<string, string> } = {}) =>
  createTestClient({
    apolloServer,
    extendMockRequest: {
      headers,
    },
  });