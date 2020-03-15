import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  isbn: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'int' })
  rating: number;
}
