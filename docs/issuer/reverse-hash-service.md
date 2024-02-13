---
id: reverse-hash-service
title: Reverse Hash Service
sidebar_label: RHS Setup
description: Reverse Hash Service Setup.
keywords:
  - docs
  - polygon id
  - issuer node
  - rhs
  - reverse hash service
  - setup
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Reverse Hash Service Set up

Repository: https://github.com/iden3/reverse-hash-service

There are two options for installing and running the RHS:

1. [Docker Setup Guide](#docker-set-up-guide)
2. [Standalone Mode Guide](#standalone-mode-guide)

## Docker Set Up Guide

:::note
Docker set up should only be used for testing purposes only
:::

### Requirements

- Unix-based operating system (e.g. Debian, Arch, Mac OS X)
- [Docker Engine](https://docs.docker.com/engine/) 1.27

1. Start the services

```bash
docker-compose up -d
```

2. Copy schema.sql to the db container

```bash
docker cp schema.sql reverse-hash-service_db_1:/
```

3. Exec db container

```bash
docker exec -it reverse-hash-service_db_1 /bin/bash
```

4. Create RHS DB

```bash
createdb -U iden3 -h localhost rhs
```

5. Upload schema.sql inside on docker container

```bash
psql -h localhost -U iden3  -d rhs < schema.sql
```

## Standalone Mode Guide

### Requirements

- Unix-based operating system (e.g. Debian, Arch, Mac OS X)
- [Go](https://go.dev/) version 1.18 or higher
- [Postgres](https://www.postgresql.org/)

1. Access PostgreSQL instance and create database

```
createdb rhs && psql -d rhs < ./schema.sql
```

2. Export DB configuration

```
export RHS_DB="host=localhost password=pgpwd user=postgres database=rhs"
```

3. Build and run RHS servoce

```
go build && ./reverse-hash-service
```
