import { SeedCategories } from "./category.seed";
import { SeedClients } from "./client.seed";
import { SeedProviders } from "./provider.seed";
import { SeedProviderServices } from "./provider_service.seed";
import { SeedServices } from "./service.seed";


(async () => {
  console.log('🌱 Rodando as seeds...');

  try {

    await SeedCategories();
    console.log('✅ Categories seeded');

    await SeedServices();
    console.log('✅ Services seeded');

    await SeedProviders();
    console.log('✅ Providers seeded');

    await SeedClients();
    console.log('✅ Clients seeded');

    await SeedProviderServices();
    console.log('✅ ProviderServices seeded');

    console.log('🎉 Todas as seeds rodaram com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao rodar as seeds:', err);
  }
})();
