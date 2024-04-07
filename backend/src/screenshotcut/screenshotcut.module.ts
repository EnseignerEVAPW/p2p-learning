import { Module } from '@nestjs/common';
import { ScreenshotCutController } from './screenshotcut.controller';
import { ScreenshotCutService } from './screenshotcut.service';

@Module({
  controllers: [ScreenshotCutController],
  providers: [ScreenshotCutService],
})
export class ScreenshotCutModule {}
