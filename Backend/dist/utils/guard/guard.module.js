"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./roles.guard");
const core_2 = require("@nestjs/core");
const auth_module_1 = require("../../modules/Auth/auth.module");
const auth_guard_1 = require("./auth.guard");
let GuardModule = class GuardModule {
};
exports.GuardModule = GuardModule;
exports.GuardModule = GuardModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        providers: [
            core_2.Reflector,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], GuardModule);
//# sourceMappingURL=guard.module.js.map