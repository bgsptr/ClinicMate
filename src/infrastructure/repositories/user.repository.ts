import { UserEntity } from "../../core/domain/entities/user.entity";
import { IUserRepository } from "../../core/domain/interfaces/repositories/user.repository.interface";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<UserEntity | null> {
        return null
    }

    async updateByEmail(email: string, data: UserEntity): Promise<void> {
        
    }

    async create(data: UserEntity): Promise<void> {

    }
}
