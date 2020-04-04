all: build push

build:
	docker build -t registry.gitlab.com/pod-o-mat/docker/mqtt2elasticsearch .

push:
	docker push registry.gitlab.com/pod-o-mat/docker/mqtt2elasticsearch

run:
	docker run -ti -d --name mqtt2elastisearch registry.gitlab.com/pod-o-mat/docker/mqtt2elasticsearch