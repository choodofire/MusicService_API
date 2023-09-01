# MusicService_API

The backend part of music streaming service application.

NestJS + TypeScript framework, PostgreSQL database, sending email notifications using "nodemailer".


API created with swagger on endpoint "/api/docs".

## Installation

```bash
# set correct Node
$ nvm use $(cat nodeV)

# install
$ npm install
```
## Documentation of API

```bash
$ <host>:<port>/api/docs/
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build
$ npm run build

# production mode
$ npm run start:prod
```

## docker
```bash
# build
$ docker build -t musicservice .

# run
$ docker run -p 5000:5000 --name musicservice musicservice
```

## docker-compose
```bash
# build
$ docker-compose build

# up
$ docker-compose up
```
