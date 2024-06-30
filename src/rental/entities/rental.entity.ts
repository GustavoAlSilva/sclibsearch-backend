import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rental' })
export class RentalEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
    book: BookEntity;

    @Column({ name: 'due_date' })
    dueDate: Date;

    @Column({ name: 'return_date' })
    returnDate: Date;

    @Column({
        name: 'fine_amount',
        type: 'decimal',
        scale: 2,
        default: 0,
    })
    fineAmount: number;

    @Column()
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
