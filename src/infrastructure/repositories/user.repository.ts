import { Role } from "src/core/domain/interfaces/dtos/users/core-user-information.dto";
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

    async findRoleByEmail(email: string): Promise<string> {
        const { role } = await this.prisma.user.findUniqueOrThrow({
            where: { email },
            select: {
                role: true
            }
        })
        return role!;
    }

    async updateRoleByEmail(email: string, role: Role): Promise<void> {
        await this.prisma.user.update({
            where: { email },
            data: {
                role
            }
        })
    }
}
