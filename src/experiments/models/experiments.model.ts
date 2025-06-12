import {
  Table, Column, Model, DataType,
  PrimaryKey, AllowNull,
  HasMany, CreatedAt, UpdatedAt, AutoIncrement,
} from 'sequelize-typescript';
import { Variant } from '../../variants/models/variants.model';
import { Assignment } from '../../assignments/models/assignments.model';
import { EXPERIMENT_STATUSES, TExperimentStatus } from '../experiments.constants';

interface ExperimentCreationAttrs {
  name: string;
  key: string;
  status: TExperimentStatus;
}

@Table({ tableName: 'experiments' })
export class Experiment extends Model<Experiment, ExperimentCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare key: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...EXPERIMENT_STATUSES))
  declare status: TExperimentStatus;

  @HasMany(() => Variant)
  declare variants: Variant[];

  @HasMany(() => Assignment)
  declare assignments: Assignment[];

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}