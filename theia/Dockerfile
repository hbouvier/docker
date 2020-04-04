FROM theiaide/theia:0.16.1
USER 0
RUN apk add --update-cache \
		docker \
		docker-compose \
		make \
		sudo && \
	echo 'Set disable_coredump false' >> /etc/sudo.conf && \
	echo 'theia ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
	rm -rf /var/cache/apk/*
USER 1001:0
