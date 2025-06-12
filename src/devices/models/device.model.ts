import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  CreatedAt,
  UpdatedAt, PrimaryKey, Default,
} from 'sequelize-typescript';
import { Assignment } from '../../assignments/models/assignments.model';

interface DeviceCreationAttrs {
  id: string;
}

@Table({ tableName: 'devices' })
export class Device extends Model<Device, DeviceCreationAttrs> {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isActivated: boolean;

  @HasMany(() => Assignment)
  declare assignments: Assignment[];

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}
