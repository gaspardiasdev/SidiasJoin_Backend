"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminActionModule = void 0;
const common_1 = require("@nestjs/common");
const admin_action_service_1 = require("./admin-action.service");
const admin_action_controller_1 = require("./admin-action.controller");
const prisma_service_1 = require("../../databases/connection/prisma.service");
let AdminActionModule = class AdminActionModule {
};
exports.AdminActionModule = AdminActionModule;
exports.AdminActionModule = AdminActionModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_action_controller_1.AdminActionController],
        providers: [admin_action_service_1.AdminActionService, prisma_service_1.PrismaService],
        exports: [admin_action_service_1.AdminActionService],
    })
], AdminActionModule);
//# sourceMappingURL=admin-action.module.js.map