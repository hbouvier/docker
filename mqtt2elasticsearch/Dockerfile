FROM node:12.16-alpine3.11

ENV USE_LOCALTIME=true \
    PUBLISHDELAY=5000 \
    M2E_DEBUG=false \
    ELASTIC_VERSION=7.6 \
    ELASTIC_LOGLEVEL=info \
    ELASTICSEARCH_URL=http://elastic:changeme@127.0.0.1:9200 \
    MQTT_URL=mqtt://127.0.0.1:1883 \
    MQTT_CLIENTID=mqtt2elsaticsearch \
    MQTT_CLEAN=false \
    MQTT_TOPICS=logstash,metric
    # MQTT_USERNAME=
    # MQTT_PASSWORD=

WORKDIR /app

COPY . /app/
RUN npm install

ENTRYPOINT ["node"]

CMD ["mqtt2elasticsearch.js"]
