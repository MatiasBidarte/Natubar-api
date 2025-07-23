import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuscripcionNotificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: string;

  @Column()
  clienteId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registradoEn: Date;

  @Column({ nullable: true })
  dispositivo: string;
}
