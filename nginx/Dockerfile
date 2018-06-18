FROM alpine:latest

ENV VERSION=1.0.4
WORKDIR /app
ADD https://github.com/hbouvier/watchgod/releases/download/v${VERSION}/watchgod.v${VERSION}.zip /app/
RUN unzip watchgod.v${VERSION}.zip && \
    mkdir -p /app/release/bin /app/release/etc && \
    mv /app/bin/linux_amd64/watchgod /app/release/bin/
COPY etc /app/release/etc/

FROM nginx:1.13-alpine
COPY --from=0 /app/release /

RUN apk update && \
    apk add inotify-tools rsync && \
    rm -rf /var/cache/apk/*

ENTRYPOINT ["/bin/watchgod"]
CMD ["-config", "/etc/watchgod.json", "boot"]
