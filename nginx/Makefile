VERSION:=$(shell cat VERSION.txt)
ORIGIN:=$(shell cat ../.origin 2>/dev/null || echo 'origin')

image:
	@if [ "$(git status | tr -dc '[:print:]')" == "On branch masternothing to commit, working tree clean" ] ; then \
		git checkout -b nginx/${VERSION} ; \
		echo "[ok] Created branch nginx/${VERSION}" ; \
		git push ${ORIGIN} ; \
		echo "[ok] Push code the gitlab" ; \
		git checkout master ; \
		echo "[ok] Started build on gitlab CI/CD" ; \
	elif [ "$(git status | tail -1')" == "nothing to commit, working tree clean" ] ; then \
		git push ${ORIGIN} ; \
		echo "[ok] Started build on gitlab CI/CD" ; \
	else \
		@echo "[KO] To build the nginx image, you need to be on the master branch with a clean tree." ; \
		@echo "     Commit your work before trying to create a docker image." ; \
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
		echo "Ready to create the new relase: nginx/${VERSION}" ; \
	elif [ "$(git status | tail -1')" == "nothing to commit, working tree clean" ] ; then \
		echo "UPDATE/OVERWRITE current release nginx/${VERSION}" ; \
	else \
		echo "Git branch is dirty, you need to commit your work!" ; \
	fi
