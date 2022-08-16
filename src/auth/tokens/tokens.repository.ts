import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Token } from './entities/token.entity';

export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}
  repository = this.tokenRepository.extend({
    async createToken(refreshToken: string): Promise<Token> {
      const token = refreshToken;
      const refresthTokenBlackList = this.create({
        token,
      });
      await this.save(refresthTokenBlackList);
      return refresthTokenBlackList;
    },
  });
}
