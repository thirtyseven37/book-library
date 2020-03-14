import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  isbn: string;

  @Column({ type: 'int' })
  pages: string;

  @Column({ type: 'int' })
  rating: string;
}
