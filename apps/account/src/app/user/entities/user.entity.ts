import {IUser, UserRole} from "@music_service_api/interfaces";
import {compare, genSalt, hash} from "bcryptjs";

export class UserEntity implements IUser {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  displayName: string;
  role: UserRole;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.username = user.username;
    this.displayName = user.displayName;
    this.role = user.role;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
