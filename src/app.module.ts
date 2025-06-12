import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AssignmentsModule } from './assignments/assignments.module';
import { ExperimentsModule } from './experiments/experiments.module';
import { VariantsModule } from './variants/variants.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        models: [],
        autoLoadModels: true,
      }),
    }),
    DevicesModule,
    AssignmentsModule,
    ExperimentsModule,
    VariantsModule,
    StatisticsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
