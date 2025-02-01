import { Repository } from "src/core/base/repository";
import { UserEntity } from "../../entities/user.entity";

export interface IUserRepository extends Repository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | null>;
    updateByEmail(email: string, data: UserEntity): Promise<void>;
}