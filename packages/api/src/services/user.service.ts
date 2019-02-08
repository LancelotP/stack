import { User } from "../models/user.entity";
import { getRepository } from "typeorm";
import { BaseService } from "./service";

export class UserService extends BaseService<User> {
  repo = getRepository(User);

  async delete(userId: number) {
    if (!this.viewer) {
      throw new Error("Not logged");
    }

    const user = await this.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("No user found");
    }

    await getRepository(User).remove(user);
    return user;
  }
}
