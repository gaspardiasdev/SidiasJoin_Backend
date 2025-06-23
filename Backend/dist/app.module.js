"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/Auth/auth.module");
const category_module_1 = require("./modules/category/category.module");
const services_module_1 = require("./modules/services/services.module");
const review_module_1 = require("./modules/review/review.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const like_module_1 = require("./modules/like/like.module");
const admin_action_module_1 = require("./modules/admin/admin-action.module");
const guard_module_1 = require("./utils/guard/guard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            services_module_1.ServicesModule,
            review_module_1.ReviewModule,
            subscription_module_1.SubscriptionModule,
            like_module_1.LikeModule,
            admin_action_module_1.AdminActionModule,
            guard_module_1.GuardModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map