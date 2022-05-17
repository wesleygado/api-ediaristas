import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TokenRepository } from './tokens.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TokenRepository])],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
