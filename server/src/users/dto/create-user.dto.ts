import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@test.ru',
  })
  email: string;
  @ApiProperty({
    default: 'Влад',
  })
  fullname: string;
  @ApiProperty({
    default: '123456',
  })
  password: string;
}
