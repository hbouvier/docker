# RabbitMQ

This is a simple High Availability (HA) implementation of RabbitMQ using Kubernetes Statefulsets.

## Importing the base Official image to gitlab registry

Since the images on the Official Docker hub can be overwritten, I like
to keep the base image used for this project in then pod-o-mat namespace.
Here are the manual steps used to import the official image from Docker Hub.

```
# On Sat 16 Jun 2018 12:11:42 EDT
docker pull rabbitmq:3.6.9-management
docker tag rabbitmq:3.6.9-management registry.gitlab.com/pod-o-mat/docker/rabbitmq:3.6.9-management
docker push registry.gitlab.com/pod-o-mat/docker/rabbitmq:3.6.9-management
```

