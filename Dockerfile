FROM node:13 as installer
COPY . /threadsapp
WORKDIR /threadsapp
RUN npm install && \
    npm run client_install

FROM node:13-slim
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends \
    mongodb \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /threadsapp
# RUN groupadd -r threadsapp && useradd --no-log-init -r -g threadsapp threadsapp
# USER threadsapp

COPY --from=installer /threadsapp .
EXPOSE 3000 4000
CMD ["bash", "-c", "service mongodb start && npm start"]
