import { UserEntity } from "../../core/domain/entities/user.entity";
import { IUserRepository } from "../../core/domain/interfaces/repositories/user.repository.interface";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository implements IUserRepository {
    
    async findByEmail(email: string): Promise<UserEntity> {
        return await this.prisma.user.findFirstOrThrow({
            where: {
                email: email
            }
        })
    }

    async updateByEmail(email: string, data: UserEntity): Promise<void> {
        
    }

    async create(data: UserEntity): Promise<void> {
        await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
            }
        })
    }

    async updateRoleByEmail(email: string): Promise<void> {
        await this.prisma.user.findUniqueOrThrow({
            where: { email }
        })
    }
}
