import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-ctr';
  private secretKey = 'secret key';

  encrypt(data: string): string {
    const cipher = crypto.createCipher(this.algorithm, this.secretKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(data: string): string {
    const decipher = crypto.createDecipher(this.algorithm, this.secretKey);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
