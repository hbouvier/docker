FROM alpine:3.6

# ENV SQUID_VERSION=3.5.23-r2
ENV SQUID_VERSION=3.5.27-r0

RUN apk add --update squid=${SQUID_VERSION} && rm -rf /var/cache/apk/*

RUN ln -sf /dev/stdout /var/log/squid/access.log
RUN ln -sf /dev/stdout /var/log/squid/store.log
RUN ln -sf /dev/stdout /var/log/squid/cache.log

COPY squid.conf /etc/squid/squid.conf
COPY run.sh /run.sh

RUN chmod +x /run.sh

EXPOSE 3128

CMD ["/run.sh"]