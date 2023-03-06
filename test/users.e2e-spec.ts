import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { UsersService } from "../src/users/users.service";
import { UsersModule } from "../src/users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../src/users/users.model";
import { Ban } from "../src/users/bans.model";
import { Role } from "../src/roles/roles.model";
import { UserRoles } from "../src/roles/user-roles.model";
import { Playlist } from "../src/playlists/playlists.model";
import { Musician } from "../src/musicians/musicians.model";
import { Album } from "../src/albums/albums.model";
import { Song } from "../src/songs/songs.model";
import { PlaylistSongs } from "../src/playlists/playlist-songs.model";
import { Subscriptions } from "../src/users/subscription.model";
import { Likes } from "../src/users/likes.model";


describe('UsersController E2E Test', () => {
  let app: INestApplication;
  let usersService = { findAll: () => ['test'] }
  jest.useFakeTimers()

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('Get Users GET /users', () => {
    const GET_USERS_URL: string = '/users';

    it('/GET users', () => {
      return request(app.getHttpServer())
        .get(GET_USERS_URL)
        .expect(200)
    })


  })

  afterAll(async () => {
    await app.close();
  });
})