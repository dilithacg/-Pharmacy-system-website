import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PharmacyController } from './controllers/pharmacy.controller';
import { PharmacyService } from './services/pharmacy.service';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { PharmacyStockController } from './controllers/pharmacy-stock.controller';
import { PharmacyPriceController } from './controllers/pharmacy-price.controller';
import { PharmacyPriceService } from './services/pharmacy-price.service';
import { PharmacyStockService } from './services/pharmacy-stock.service';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { BillController } from './controllers/bill.controller';
import { BillService } from './services/bill.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pharmacy_dev',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: false,
    }),
    JwtModule.register({
      secret: 'pharmacy',
      signOptions: { expiresIn: '900s' },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    PharmacyController,
    OrderController,
    ItemController,
    PharmacyPriceController,
    PharmacyStockController,
    BillController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    PharmacyService,
    OrderService,
    ItemService,
    PharmacyPriceService,
    PharmacyStockService,
    BillService,
  ],
})
export class AppModule {}
