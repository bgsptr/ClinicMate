import { PrismaClient } from "@prisma/client";

export class BaseRepository {
    constructor(protected prisma: PrismaClient) {
        this.prisma = new PrismaClient();
    }
}