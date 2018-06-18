#!/bin/sh -ex

if [ "${NGINX_ENABLE_RESOLVER}" != "" ] ; then
  RESOLVER=$(grep nameserver /etc/resolv.conf | awk '{print $2}' | head -1)
  sed -e "s/# resolver 127.0.0.1 valid=10s;/resolver ${RESOLVER} valid=10s;/" -i.resolver.orig /etc/nginx/conf.d/default.conf
fi

if [ "${NGINX_UPSTREAM_SERVER}" != "" ] ; then
  sed -e "s/127.0.0.1:32768/${NGINX_UPSTREAM_SERVER}/" -i.upstream.orig /etc/nginx/conf.d/default.conf
fi
exec "$@"
