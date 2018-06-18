FROM alpine:latest as build

ENV WATCHDOG_VERSION=1.0.4

WORKDIR /app

COPY root /app/release/
ADD https://github.com/hbouvier/watchgod/releases/download/v${WATCHDOG_VERSION}/watchgod.v${WATCHDOG_VERSION}.zip /app/
RUN unzip watchgod.v${WATCHDOG_VERSION}.zip && \
    mv /app/bin/linux_amd64/watchgod /app/release/bin/

FROM nginx:1.14-alpine
COPY --from=build /app/release /

RUN apk update && \
    apk add inotify-tools rsync && \
    rm -rf /var/cache/apk/*

ENTRYPOINT ["/bin/docker-entrypoint.sh"]
CMD ["/bin/watchgod", "-config", "/etc/watchgod.json", "boot"]
