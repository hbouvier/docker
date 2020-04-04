


The `mqtt2elasticsearch` collector expect a payload containing at the minimum the following fields to be properly indexed by elastic search.

```javascript
payload = {
    '@timestamp': (new Date().toISOString(),
    message: "Free form text message to be shown in Kibana".
};
mqtt.publish('/elasticsearch/logstash', JSON.stringify(payload));
```

The indice in elastic search would look like this:
```
  @timestamp  Apr 3, 2020 @ 23:27:05.856
  _id uaQ6Q3EBQDEuglQuSx2N
  _index  logstash-2020.04.03-000001
  _score   - 
  _type _doc
  message This is a long message for you
```


You can add scructured fields like this
```javascript
payload = {
    '@timestamp': (new Date(msg.payload)).toISOString(),
    '@tags': ['node-red', 'metric', 'alert'],
    '@fields': {
        "cpu": 0.10,
        "mem": 8000000000,
        "hostname": "spiderman.multiverse.com"
    },
    message:"Alert, HIGH memory usage on host spiderman.multiverse.com"
};
mqtt.publish('/elasticsearch/logstash', JSON.stringify(payload));
```

Now we have a richer index with structured data that we can use in queries and in visualisation show a nice dashboard.
```
  @fields.cpu  0.1
  @fields.mem  8000000000
  @fields.hostname spiderman.multiverse.com
  @tags node-red, metric alert
  @timestamp  Apr 3, 2020 @ 23:27:05.856
  _id uaQ6Q3EBQDEuglQuSx2N
  _index  logstash-2020.04.03-000001
  _score   - 
  _type _doc
  message Alert, HIGH memory usage on host spiderman.multiverse.com
```
