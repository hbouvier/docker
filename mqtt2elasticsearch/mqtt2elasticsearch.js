
const mqtt = require('mqtt');
const elasticsearch = require('elasticsearch');

// --- Configure mqtt2elasticsearch
const useLocalTime = (process.env.USE_LOCALTIME || 'true') === 'true';
const publishDelay = process.env.PUBLISHDELAY   || 5000;
const debug        = (process.env.M2E_DEBUG     || 'false') === 'true';

// --- Configure ElasticSearch
const es_version   = process.env.ELASTIC_VERSION   || '7.6'; // use the same version of your Elasticsearch instance
const es_loglevel  = process.env.ELASTIC_LOGLEVEL  || 'info';
const es_url       = process.env.ELASTICSEARCH_URL || 'http://elastic:changeme@127.0.0.1:9200';

const es_options = {
  host: es_url,
  log: es_loglevel,
  apiVersion: es_version
}

console.log(`connecting to elastic search: `, es_options);
const esclient = new elasticsearch.Client(es_options);

// --- Configure MQTT
const mqtt_url      = process.env.MQTT_URL      || 'mqtt://127.0.0.1:1883';
const mqtt_clientid = process.env.MQTT_CLIENTID || 'mqtt2elsaticsearch';
const mqtt_clean    = (process.env.MQTT_CLEAN   || 'false') === 'true';
const mqtt_username = process.env.MQTT_USERNAME;
const mqtt_password = process.env.MQTT_PASSWORD;
const mqtt_topics   = process.env.MQTT_TOPICS   || 'logstash';

const options = Object.assign({},{
  clientId: mqtt_clientid,
  clean: mqtt_clean
}, mqtt_username ? {
  username: mqtt_username,
  password: mqtt_password
} : {});


console.log(`[info] connecting to ${mqtt_url}: `, options);
const mqttclient = mqtt.connect(
  mqtt_url,
  options
);

// --- 

function nowLocal() {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  return localISOTime;
}

function nowUTC() {
  const utcISOTime = (new Date()).toISOString();
  return utcISOTime;
}

function now() {
  return useLocalTime ? () => nowLocal() : () => nowUTC();
}

function getIndex(topic, date) {
  // topic: /elasticsearch/logstash  => logstash
  // date:  2020-04-04T12:46:18.691Z => 2020.04.04
  return { index: { 
    _index: `${topic.split('/').slice(-1)[0]}-${date.substr(0,10).replace(/-/g,'.')}`,
    _type: '_doc'
  }};
}

function publisher() {
  const getIndexDate = now();
  var rows = [];

  mqttclient.on('message', (topic, message) => {
    const index = getIndex(topic, getIndexDate());
    const msg_string = message.toString();
    if (debug) console.log(msg_string);
    if (msg_string === '') return;
    var msg = msg_string;
    try { msg = JSON.parse(msg); } catch (err) { console.log(`[error] MQTT unable to parse message: ${msg_string}: `, err); }
    if (debug) console.log(`[debug] queuing: ${JSON.stringify(index)}, ${JSON.stringify(msg)}`);
    rows.push(index);
    rows.push(msg);
  });

  const elasticWriter = () => {
    if (rows.length === 0) {
      setTimeout(elasticWriter, publishDelay);
      return;
    }
    if (debug) console.log(`[debug] ES bulk insert: ${JSON.stringify(rows)}`);
    esclient.bulk({ body: rows }, (err, resp, status) => {
      // TODO: When we have an error, we should keep the rows and retry.
      if (err) console.log('[error] ES bulk insert error: ', err);
      rows = [];
      elasticWriter();
    });
  };
  elasticWriter();
}

function subscribed(err) {
  if (err) {
    console.log('[info] MQTT failed to subscribe: ', err);
    process.exit(-1);
  }
  mqttclient.on('error', err => {
    console.log(err);
    console.log("[error] logstash can't connect"+err);
  });
  publisher();
}

function connected() {
  const topics = mqtt_topics.split(',');
  console.log(`[info] MQTT subribing to topics ${topics}`);
  mqttclient.subscribe(topics, subscribed);
}

function start() {
  console.log(`[info] MQTT Connecting to ${mqtt_url}`);
  mqttclient.on('connect', connected);
}

start();
