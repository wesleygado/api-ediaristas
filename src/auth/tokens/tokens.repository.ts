import { EntityRepository, Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  async createToken(refreshToken: string): Promise<Token> {
    const token = refreshToken;
    const refresthTokenBlackList = this.create({
      token,
    });
    await this.save(refresthTokenBlackList);
    return refresthTokenBlackList;
  }
}
