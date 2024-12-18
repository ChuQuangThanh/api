import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('API') // Tag trong Swagger
@Controller('api')
export class AppController {
  // 1. Api trả về lời chào
  @Get('hello')
  @ApiOperation({ summary: 'Get a welcome message' })
  @ApiResponse({ status: 200, description: 'Returns a welcome message' })
  getHello(): string {
    return 'Welcome to my WebAPI!';
  }

  // 2. Api trả về thông tin người dùng với các trường id, Name, Email
  @Get('user/:id/Name/:Name/Email/:Email')
  @ApiOperation({ summary: 'Get user information' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiParam({ name: 'Name', description: 'User Name', example: 'John Doe' })
  @ApiParam({ name: 'Email', description: 'User Email', example: 'johndoe@example.com' })
  @ApiResponse({ status: 200, description: 'Returns user information' })
  getUser(
    @Param('id') id: string,
    @Param('Name') Name: string,
    @Param('Email') Email: string,
  ): any {
    return {
      id,
      Name,
      Email,
    };
  }

  // 3. Api trả về danh sách các sản phẩm có sẵn(id, name, price)
  @Get('products')
  @ApiOperation({ summary: 'Get a list of products' })
  @ApiResponse({ status: 200, description: 'Returns a list of products' })
  getProducts(): any[] {
    return [
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 },
      { id: 3, name: 'Product C', price: 300 },
    ];
  }

  // 4. Api tính tổng 2 số
  @Get('sum/:a/:b')
  @ApiOperation({ summary: 'Get the sum of two numbers' })
  @ApiParam({ name: 'a', description: 'First number', example: 5 })
  @ApiParam({ name: 'b', description: 'Second number', example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Returns the sum of two numbers',
    schema: {
      example: { a: 5, b: 10, sum: 15 },
    },
  })
  getSum(@Param('a') a: string, @Param('b') b: string): any {
    const sum = parseInt(a) + parseInt(b);
    return { a: parseInt(a), b: parseInt(b), sum };
  }

  // 5. Api lấy ảnh từ 1 nguồn
  @Get('image')
  @ApiOperation({ summary: 'Get an image' })
  @ApiResponse({
    status: 200,
    description: 'Returns an image',
    content: { 'image/jpeg': { schema: { type: 'string', format: 'binary' } } },
  })
  getImage(@Res() res: Response): void {
    const imagePath = join(
      __dirname,
      '../assets/anime-youjo-senki-tanya-degurechaff-wallpaper-preview.jpg',
    ); //Đường dẫn đến ảnh
    res.sendFile(imagePath);
  }
}
