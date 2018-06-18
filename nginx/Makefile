VERSION:=1.13-alpine-001

all: build push

build:
	docker build -t hbouvier/nginx:${VERSION} .

push:
	docker push hbouvier/nginx:${VERSION}