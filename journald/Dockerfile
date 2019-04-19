FROM ubuntu

CMD ["/bin/sh", "-c", "/usr/bin/journalctl -D $(ls -d /var/log/journal) --utc --no-pager -f"]
