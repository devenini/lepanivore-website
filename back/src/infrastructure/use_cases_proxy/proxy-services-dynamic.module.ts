import { DynamicModule, Module } from '@nestjs/common';
import { AddNewClosingPeriod } from '../../use_cases/add-new-closing-period';
import { AddNewProduct } from '../../use_cases/add-new-product';
import { ArchiveProduct } from '../../use_cases/archive-product';
import { DeleteClosingPeriod } from '../../use_cases/delete-closing-period';
import { DeleteOrder } from '../../use_cases/delete-order';
import { GetActiveProducts } from '../../use_cases/get-active-products';
import { GetClosingPeriods } from '../../use_cases/get-closing-periods';
import { GetOrders } from '../../use_cases/get-orders';
import { OrderProducts } from '../../use_cases/order-products';
import { UpdateExistingOrder } from '../../use_cases/update-existing-order';
import { UpdateExistingProduct } from '../../use_cases/update-existing-product';
import { DatabaseClosingPeriodRepository } from '../repositories/database-closing-period.repository';
import { DatabaseOrderRepository } from '../repositories/database-order.repository';
import { DatabaseProductRepository } from '../repositories/database-product.repository';
import { EmailOrderNotificationRepository } from '../repositories/email-order-notification.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static ORDER_PRODUCTS_PROXY_SERVICE: string = 'OrderProductsProxyService';
  static GET_CLOSING_PERIODS_PROXY_SERVICE: string = 'GetClosingPeriodsProxyService';
  static GET_ACTIVE_PRODUCTS_PROXY_SERVICE: string = 'GetActiveProductsProxyService';
  static GET_ORDERS_PROXY_SERVICE: string = 'GetOrdersProxyService';
  static UPDATE_EXISTING_ORDER_PROXY_SERVICE: string = 'UpdateExistingOrderProxyService';
  static DELETE_ORDER_PROXY_SERVICE: string = 'DeleteOrderProxyService';
  static ADD_NEW_PRODUCT_PROXY_SERVICE: string = 'AddNewProductProxyService';
  static UPDATE_EXISTING_PRODUCT_PROXY_SERVICE: string = 'UpdateExistingProductProxyService';
  static ARCHIVE_PRODUCT_PROXY_SERVICE: string = 'ArchiveProductProxyService';
  static ADD_NEW_CLOSING_PERIOD_PROXY_SERVICE: string = 'AddNewClosingPeriodProxyService';
  static DELETE_CLOSING_PERIOD_PROXY_SERVICE: string = 'DeleteClosingPeriodProxyService';

  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [DatabaseProductRepository, DatabaseClosingPeriodRepository, DatabaseOrderRepository, EmailOrderNotificationRepository],
          provide: ProxyServicesDynamicModule.ORDER_PRODUCTS_PROXY_SERVICE,
          useFactory: (
            databaseProductRepository: DatabaseProductRepository,
            databaseClosingPeriodRepository: DatabaseClosingPeriodRepository,
            databaseOrderRepository: DatabaseOrderRepository,
            emailOrderNotificationRepository: EmailOrderNotificationRepository
          ) =>
            new UseCaseProxy(
              new OrderProducts(databaseProductRepository, databaseClosingPeriodRepository, databaseOrderRepository, emailOrderNotificationRepository)
            ),
        },
        {
          inject: [DatabaseClosingPeriodRepository],
          provide: ProxyServicesDynamicModule.GET_CLOSING_PERIODS_PROXY_SERVICE,
          useFactory: (databaseClosingPeriodRepository: DatabaseClosingPeriodRepository) =>
            new UseCaseProxy(new GetClosingPeriods(databaseClosingPeriodRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: ProxyServicesDynamicModule.GET_ACTIVE_PRODUCTS_PROXY_SERVICE,
          useFactory: (databaseProductRepository: DatabaseProductRepository) => new UseCaseProxy(new GetActiveProducts(databaseProductRepository)),
        },
        {
          inject: [DatabaseOrderRepository],
          provide: ProxyServicesDynamicModule.GET_ORDERS_PROXY_SERVICE,
          useFactory: (databaseOrderRepository: DatabaseOrderRepository) => new UseCaseProxy(new GetOrders(databaseOrderRepository)),
        },
        {
          inject: [DatabaseProductRepository, DatabaseClosingPeriodRepository, DatabaseOrderRepository],
          provide: ProxyServicesDynamicModule.UPDATE_EXISTING_ORDER_PROXY_SERVICE,
          useFactory: (
            databaseProductRepository: DatabaseProductRepository,
            databaseClosingPeriodRepository: DatabaseClosingPeriodRepository,
            databaseOrderRepository: DatabaseOrderRepository
          ) => new UseCaseProxy(new UpdateExistingOrder(databaseProductRepository, databaseClosingPeriodRepository, databaseOrderRepository)),
        },
        {
          inject: [DatabaseOrderRepository],
          provide: ProxyServicesDynamicModule.DELETE_ORDER_PROXY_SERVICE,
          useFactory: (databaseOrderRepository: DatabaseOrderRepository) => new UseCaseProxy(new DeleteOrder(databaseOrderRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: ProxyServicesDynamicModule.ADD_NEW_PRODUCT_PROXY_SERVICE,
          useFactory: (databaseProductRepository: DatabaseProductRepository) => new UseCaseProxy(new AddNewProduct(databaseProductRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: ProxyServicesDynamicModule.UPDATE_EXISTING_PRODUCT_PROXY_SERVICE,
          useFactory: (databaseProductRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new UpdateExistingProduct(databaseProductRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: ProxyServicesDynamicModule.ARCHIVE_PRODUCT_PROXY_SERVICE,
          useFactory: (databaseProductRepository: DatabaseProductRepository) => new UseCaseProxy(new ArchiveProduct(databaseProductRepository)),
        },
        {
          inject: [DatabaseClosingPeriodRepository],
          provide: ProxyServicesDynamicModule.ADD_NEW_CLOSING_PERIOD_PROXY_SERVICE,
          useFactory: (databaseClosingPeriodRepository: DatabaseClosingPeriodRepository) =>
            new UseCaseProxy(new AddNewClosingPeriod(databaseClosingPeriodRepository)),
        },
        {
          inject: [DatabaseClosingPeriodRepository],
          provide: ProxyServicesDynamicModule.DELETE_CLOSING_PERIOD_PROXY_SERVICE,
          useFactory: (databaseClosingPeriodRepository: DatabaseClosingPeriodRepository) =>
            new UseCaseProxy(new DeleteClosingPeriod(databaseClosingPeriodRepository)),
        },
      ],
      exports: [
        ProxyServicesDynamicModule.ORDER_PRODUCTS_PROXY_SERVICE,
        ProxyServicesDynamicModule.GET_CLOSING_PERIODS_PROXY_SERVICE,
        ProxyServicesDynamicModule.GET_ACTIVE_PRODUCTS_PROXY_SERVICE,
        ProxyServicesDynamicModule.GET_ORDERS_PROXY_SERVICE,
        ProxyServicesDynamicModule.UPDATE_EXISTING_ORDER_PROXY_SERVICE,
        ProxyServicesDynamicModule.DELETE_ORDER_PROXY_SERVICE,
        ProxyServicesDynamicModule.ADD_NEW_PRODUCT_PROXY_SERVICE,
        ProxyServicesDynamicModule.UPDATE_EXISTING_PRODUCT_PROXY_SERVICE,
        ProxyServicesDynamicModule.ARCHIVE_PRODUCT_PROXY_SERVICE,
        ProxyServicesDynamicModule.ADD_NEW_CLOSING_PERIOD_PROXY_SERVICE,
        ProxyServicesDynamicModule.DELETE_CLOSING_PERIOD_PROXY_SERVICE,
      ],
    };
  }
}
