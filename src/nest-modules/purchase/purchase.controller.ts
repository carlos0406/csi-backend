import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePurchaseUsecase } from 'src/core/purchase/application/create-purchase.usecase';
import { ListPurchaseUseCase } from 'src/core/purchase/application/list-purchase.usecase';
import { PurchaseInputSchema } from 'src/core/purchase/domain/purchase.schema';
import { AuthGuard } from '../auth/auth.guard';
import { ISessionData, Public, Session } from '../common/decorators';
import { CheckIsAdminGuard } from '../auth/check-is-admin.guard';

@UseGuards(AuthGuard)
@Controller('purchase')
export class PurchaseController {
  @Inject('createPurchaseUsecase')
  private readonly createPurchaseUsecase: CreatePurchaseUsecase;

  @Inject('listPurchaseUsecase')
  private readonly listPurchaseUsecase: ListPurchaseUseCase;

  @UseGuards(CheckIsAdminGuard)
  @Post()
  async create(
    @Body() data: PurchaseInputSchema,
    @Session() session: ISessionData,
  ) {
    data.userId = session.user.id;
    return this.createPurchaseUsecase.execute(data);
  }

  @Public()
  @Get()
  async list(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.listPurchaseUsecase.execute({
      page: Number(page),
      limit: Number(limit),
    });
  }
}
