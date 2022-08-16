import { Injectable } from '@nestjs/common';
import { TokenRepository } from './tokens.repository';

@Injectable()
export class TokensService {
  constructor(private tokenRepository: TokenRepository) {}
  async create(refreshToken: string) {
    const refresthTokenBlackList =
      await this.tokenRepository.repository.createToken(refreshToken);
    return refresthTokenBlackList;
  }

  async findOne(refreshToken: string) {
    const token = await this.tokenRepository.repository.findOneBy({
      token: refreshToken,
    });
    return token;
  }
}
