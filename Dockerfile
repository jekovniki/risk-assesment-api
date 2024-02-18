# STAGE: Development
FROM node:20-alpine AS dev

RUN apk --no-cache add curl

# Port to listen on
EXPOSE 8002

# Copy app and install packages
WORKDIR /app
COPY . /app/

RUN yarn

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD curl --fail http://localhost:8002/ || kill 1

# Default app commands
ENTRYPOINT ["sh", "-c", "npm run start:dev"]