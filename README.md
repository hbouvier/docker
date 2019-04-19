# Docker

Source code to automat building and versionning of docker containers



## How to build a TAGged version of a container

To build the container rabbitmq with the tag `v3.6.9`, create a tag with the name of the container followed by a slash and the tag, like this:

```
git tag rabbitmq/v3.6.9
git push origin rabbitmq/v3.6.9
```
