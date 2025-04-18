// import { SetMetadata } from "@nestjs/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// export const Roles = Reflector.createDecorator<string[]>();

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


export const FetchRoles = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.role;
    }
)