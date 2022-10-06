# Basic Worker Queues
Learn worker queue with BullMQ library

## Quick Start

Clone the project:

```bash
$ git clone https://github.com/fajarhikmal214/worker-queues
$ cd worker-queues
$ cp .env.example .env
```

## Installing Dependencies with NPM

```bash
$ npm install
```

## Run Redis Server with Docker (Must) :
```bash
$ docker run -d --name redis-server -p 6379:6379 redis:latest
```

## How to Run
- Run Server (Producer)
```bash
$ npm run server
```

- Run Client (Consumer)
```bash
$ npm run client
```
