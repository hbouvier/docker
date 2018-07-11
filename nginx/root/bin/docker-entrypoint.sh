#!/bin/sh -e

if [ "${NGINX_ENABLE_RESOLVER}" != "" ] ; then
  RESOLVER=$(grep nameserver /etc/resolv.conf | awk '{print $2}' | head -1)
  sed -e "s/# resolver 127.0.0.1 valid=10s;/resolver ${RESOLVER} valid=10s;/" -i.resolver.orig /etc/nginx/conf.d/default.conf
  printf "[ok] using container nameserver ${RESOLVER}\n"
fi

if [ "${NGINX_UPSTREAM_SERVER}" != "" ] ; then
  sed -e "s/127.0.0.1:32768/${NGINX_UPSTREAM_SERVER}/" -i.upstream.orig /etc/nginx/conf.d/default.conf
  printf "[ok] using upstream server ${NGINX_UPSTREAM_SERVER}\n"
fi

if [ -n "${NGINX_PORT}" ] ; then 
  sed -e "s/listen 80 default_server;/listen ${NGINX_PORT} default_server;/" -i.nginx.port /etc/nginx/conf.d/default.conf
  printf "[ok] using custom listen port ${NGINX_PORT}\n"
fi

exec "$@"
