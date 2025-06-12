import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variant } from './models/variants.model';
import { CreateVariantDto } from './dto/create-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variant) private variantRepository: typeof Variant,
  ) {}

  async bulkCreateForExperiment(experimentId: number, variants: CreateVariantDto[]) {
    return this.variantRepository.bulkCreate(
      variants.map((v) => ({ ...v, experimentId })),
      { returning: true },
    );
  }
}
