import {
  Table, Column, Model, DataType,
  ForeignKey, BelongsTo, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, HasMany,
} from 'sequelize-typescript';
import { Experiment } from '../../experiments/models/experiments.model';
import { Assignment } from '../../assignments/models/assignments.model';

interface VariantCreationAttrs {
  option: string;
  distribution: number;
}

@Table({ tableName: 'variants' })
export class Variant extends Model<Variant, VariantCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare option: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare distribution: number;

  @ForeignKey(() => Experiment)
  @Column(DataType.INTEGER)
  declare experimentId: string;

  @BelongsTo(() => Experiment)
  declare experiment: Experiment;

  @HasMany(() => Assignment)
  assignments: Assignment[];

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}