import {
  Table, Column, Model, DataType,
  ForeignKey, BelongsTo,
  PrimaryKey, CreatedAt, UpdatedAt,
} from 'sequelize-typescript';
import { Device } from '../../devices/models/device.model';
import { Experiment } from '../../experiments/models/experiments.model';
import { Variant } from '../../variants/models/variants.model';

interface AssignmentCreationAttrs {
  deviceId: string;
  experimentId: number;
  variantId: number;
}

@Table({ tableName: 'assignments' })
export class Assignment extends Model<Assignment, AssignmentCreationAttrs> {
  @PrimaryKey
  @ForeignKey(() => Device)
  @Column(DataType.STRING)
  declare deviceId: string;

  @PrimaryKey
  @ForeignKey(() => Experiment)
  @Column(DataType.INTEGER)
  declare experimentId: number;

  @ForeignKey(() => Variant)
  @Column(DataType.INTEGER)
  declare variantId: number;

  @BelongsTo(() => Device)
  declare device: Device;

  @BelongsTo(() => Experiment)
  declare experiment: Experiment;

  @BelongsTo(() => Variant)
  declare variant: Variant;

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}