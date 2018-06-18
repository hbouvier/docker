# NGINX

A containerized version of NGINX that automatically reload the configuration when the file changes on disk.

## How to run

```bash
$ docker run --name nginx -dti --rm -p 8100:80 -v $(pwd)/samples/conf.d:/etc/nginx/conf.d -v $(pwd)/samples/passwords:/etc/nginx/passwords hbouvier/nginx:1.13-alpine-001
```

Test that the container is responding properly

```bash
$ curl localhost:8100/health
{"ok":true}
```

Then modify the `location /health` in the samples/conf.d/default.conf file and wait for the magic. Depending on the platform you are running on, it could take up to 65 seconds for nginx to detect and reload your changes. You check the progress with

```bash
$ docker logs -f nginx
```

