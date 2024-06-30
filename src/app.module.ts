import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.TYPEORM_TYPE,
            host: process.env.TYPEORM_HOST,
            port: process.env.TYPEORM_PORT,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [__dirname + '/**/*.entity{.js,.ts}'],
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        } as TypeOrmModuleOptions),
        UserModule,
        BookModule,
        RentalModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
