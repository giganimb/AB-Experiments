import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Variant } from './models/variants.model';

@Module({
  controllers: [],
  providers: [VariantsService],
  imports: [
    SequelizeModule.forFeature([Variant]),
  ],
  exports: [VariantsService],
})
export class VariantsModule {}
