FROM registry.gitlab.com/pod-o-mat/docker/rabbitmq:3.6.9-management

RUN rabbitmq-plugins enable --offline rabbitmq_consistent_hash_exchange rabbitmq_shovel rabbitmq_shovel_management

ADD ./bin/ /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["rabbitmq-server"]