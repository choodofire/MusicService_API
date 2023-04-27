# Музыкальный стриминговый сервис

Настоящая музыкальная соцсеть: здесь можно добавлять друзей, обмениваться сообщениями и комментировать музыкальные новости
Если вы захотите послушать музыку или продвигать своё творчество, приходите к нам и у вас всё получится

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

```docker
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
