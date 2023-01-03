# ==========================================================
# Build stage
# ==========================================================

FROM node:18-bullseye AS builder

RUN apt-get update \
    && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Enables Yarn
RUN corepack enable

WORKDIR /build

COPY yarn.lock .
COPY package.json .
COPY lerna.json .
COPY packages/backend ./packages/backend
COPY packages/backend-plugin-resource ./packages/backend-plugin-resource

RUN BUILD_SEQUENCE=1 yarn install \
    && yarn cache clean

# ==========================================================
# Run stage
# ==========================================================

FROM node:18-bullseye-slim AS runner

USER node

COPY --chown=node:node --from=builder /build /home/node

WORKDIR /home/node
RUN yarn build

ENV RUNNING_IN_DOCKER=1

CMD [ "node", "packages/backend" ]