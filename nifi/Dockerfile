FROM apache/nifi:1.9.0

RUN cp /opt/nifi/nifi-current/conf/bootstrap.conf /tmp/ && \
    cat /tmp/bootstrap.conf | sed 's/java.arg.3=-Xmx512m/java.arg.3=-Xmx5120m/' > /opt/nifi/nifi-current/conf/bootstrap.conf
