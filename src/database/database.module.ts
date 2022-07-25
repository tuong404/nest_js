// import { Global, Module, Provider } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MongoClient } from 'mongodb';
// import { DATABASE_CONNECTION } from 'src/core/constant/constant';
// import { EnvironmentVariables } from 'src/config/configuration';

// const dbConfiguration: Provider = {
//   provide: DATABASE_CONNECTION,
//   useFactory(configService: ConfigService<EnvironmentVariables>) {
//     const mongoConfig = configService.get('mongo', { infer: true })!;

//     const client = new MongoClient(mongoConfig.databaseUrl, {});
//     const db = client.db(mongoConfig.databaseName);
//     return db;
//   },
//   inject: [ConfigService<EnvironmentVariables>],
// };

// @Global()
// @Module({
//   providers: [dbConfiguration],
//   exports: [dbConfiguration],
// })
// export class DatabasesModule {}
