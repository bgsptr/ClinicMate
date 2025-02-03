import { PrismaClient } from "@prisma/client";

export class BaseRepository {
    constructor(public prisma: PrismaClient) {
        this.prisma = new PrismaClient();
    }
}