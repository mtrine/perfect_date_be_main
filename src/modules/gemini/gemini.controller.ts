import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GetAiMessageDto } from './dto/get-ai-message.dto';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  @ResponseMessage('Get AI message successfully')
  async getAiMessage(@Body() dto:GetAiMessageDto){
    const result = await this.geminiService.generateText(dto);
    return result;
  }
}
