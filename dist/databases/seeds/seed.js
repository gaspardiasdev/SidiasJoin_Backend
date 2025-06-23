"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_seed_1 = require("./category.seed");
const client_seed_1 = require("./client.seed");
const provider_seed_1 = require("./provider.seed");
const provider_service_seed_1 = require("./provider_service.seed");
const service_seed_1 = require("./service.seed");
(async () => {
    console.log('🌱 Rodando as seeds...');
    try {
        await (0, category_seed_1.SeedCategories)();
        console.log('✅ Categories seeded');
        await (0, service_seed_1.SeedServices)();
        console.log('✅ Services seeded');
        await (0, provider_seed_1.SeedProviders)();
        console.log('✅ Providers seeded');
        await (0, client_seed_1.SeedClients)();
        console.log('✅ Clients seeded');
        await (0, provider_service_seed_1.SeedProviderServices)();
        console.log('✅ ProviderServices seeded');
        console.log('🎉 Todas as seeds rodaram com sucesso!');
    }
    catch (err) {
        console.error('❌ Erro ao rodar as seeds:', err);
    }
})();
//# sourceMappingURL=seed.js.map