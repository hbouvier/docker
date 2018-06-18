VERSION:=$(shell cat VERSION.txt)
ORIGIN:=$(shell cat ../.origin 2>/dev/null || echo 'origin')

image:
	if [ "$(git status | tr -dc '[:print:]')" == "On branch masternothing to commit, working tree clean" ] ; then \
		@git checkout -b ${VERSION} ; \
		@git push ${ORIGIN} ; \
		@git checkout master ; \
		@echo "[ok] Started build on gitlab CI/CD"
	else \
		@echo "[KO] To build the nginx image, you need to be on the master branch with a clean tree"
		@echo "     Commit your work and push it to the master branch"
	fi

local: local-build local-push

local-build:
	docker build -t registry.gitlab.com/pod-o-mat/docker/nginx:${VERSION} .

local-push:
	docker push registry.gitlab.com/pod-o-mat/docker/nginx:${VERSION}

check:
	@echo "VERSION=${VERSION}"
	@echo "ORIGIN=${ORIGIN}"
	@if [ "$(git status | tr -dc '[:print:]')" == "On branch masternothing to commit, working tree clean" ] ; then \
		echo Git is ready to build image ; \
	fi
