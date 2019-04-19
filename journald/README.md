# Journald

## Usage

Run the container as a DaemonSet in your Kubernetes cluster and mount the following volumes from the Host VM into the container at the exact same paths. This will allow the container to run the `journalctl` binary from the host using the host shared library to read the `journal` from the host filesystem.

## Volumes to mount from the VM host.

```
/opt
/usr
/bin
/sbin
/lib
/lib64
/var/log/journal
```
