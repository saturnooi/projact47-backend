import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalDentistAuthGuard extends AuthGuard('local-dentist') {}
