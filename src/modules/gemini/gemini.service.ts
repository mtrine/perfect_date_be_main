import { ChatSession, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetAiMessageDto } from './dto/get-ai-message.dto';
import { v4 } from 'uuid';
@Injectable()
export class GeminiService {
    private googleAI: GoogleGenerativeAI;
    private model: GenerativeModel;
    private chatSessions: { [sessionId: string]: ChatSession } = {};
    private readonly logger = new Logger(GeminiService.name);
    constructor(
        private readonly configService: ConfigService
    ) {
        const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!geminiApiKey) {
            throw new Error('GEMINI_API_KEY is not defined');
        }
        this.googleAI = new GoogleGenerativeAI(geminiApiKey);
        this.model = this.googleAI.getGenerativeModel({
            model: this.configService.get<string>('GEMINI_PRO_MODEL') || 'gemini-1.5-pro',
        });
    }


    private getChatSession(sessionId?: string) {
        let sessionIdToUse = sessionId ?? v4();

        let result = this.chatSessions[sessionIdToUse];

        if (!result) {
            result = this.model.startChat()
            this.chatSessions[sessionIdToUse] = result;
        }

        return {
            sessionId: sessionIdToUse,
            chatSession: result
        };
    }

    async generateText(dto: GetAiMessageDto) {
        try {
            const prompt = `Nơi ở : ${dto.distance}; khoảng mong muốn từ nơi ở đến địa điểm đi chơi : ${dto.distance}; phong cách: ${dto.style}; ghi chú : ${dto.note} (nếu có), hãy cho tôi 5 địa điểm đi chơi cụ thể từ yêu cầu, dùng google map để định vị trí cụ thể . Trả lời theo dang sách theo mẫu,  không được thêm bớt chữ nào: Những địa điểm hẹn hò chúng tớ tìm được theo yêu câu của bạn là: 1. .... : địa chỉ chi tiết, hoạt động`
            const { sessionId, chatSession } = this.getChatSession(dto.sessionId);
            console.log('prompt', prompt);
            const result = await chatSession.sendMessage(prompt);
            return {
                sessionId,
                text: result.response.text(),
            }
        } catch (error) {
            this.logger.error(`Error generating text: ${error.message}`);

        }
    }
}
