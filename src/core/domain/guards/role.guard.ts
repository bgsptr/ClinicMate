import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "src/core/domain/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const rolesInHandlerLevel = this.reflector.get<string[]>(Roles, context.getHandler())

        if (!rolesInHandlerLevel || rolesInHandlerLevel.length === 0) return true;

        const { user } = context.switchToHttp().getRequest() // user: { email, role };

        return rolesInHandlerLevel.includes(user?.role)
    }
}