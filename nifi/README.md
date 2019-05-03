# NIFI

Manual optimization

## Statefulset Resources:

```yaml
        resources:
          limits:
            cpu: 1500m
            memory: 5000Mi
          requests:
            cpu: 75m
            memory: 5000Mi
```

```properties
# JVM memory settings
java.arg.2=-Xms512m
java.arg.3=-Xmx4000m
```


## /opt/nifi/nifi-current/conf/bootstrap.conf

```
if [ ! -r conf/bootstrap.conf.orig ] ; then
  cp conf/bootstrap.conf conf/bootstrap.conf.orig
fi
cat conf/bootstrap.conf.orig | sed 's/java.arg.3=-Xmx512m/java.arg.3=-Xmx4000m/' > conf/bootstrap.conf
```

## /opt/nifi/nifi-current/conf/logback.xml

```
if [ ! -r conf/logback.xml.orig ] ; then
  cp conf/logback.xml conf/logback.xml.orig
fi
cat conf/logback.xml.orig | sed 's^<logger name="org.apache.nifi.processors" level="WARN"/>^<logger name="org.apache.nifi.processors" level="WARN"/>\n    <logger name="org.apache.nifi.processors.script.ExecuteScript" level="INFO"/>^' | \
  sed 's^<logger name="org.apache.nifi.controller.repository.StandardProcessSession" level="WARN" />^<logger name="org.apache.nifi.controller.repository.StandardProcessSession" level="WARN" />\n    <logger name="org.apache.nifi.controller.repository.FileSystemRepository" level="WARN"/>^' \
  > conf/logback.xml
```
