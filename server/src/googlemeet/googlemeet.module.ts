import { Module } from '@nestjs/common';
import { GoogleMeetController } from './googlemeet.controller';
import { GoogleMeetService } from './googlemeet.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [GoogleMeetController],
    providers: [GoogleMeetService],
    exports: [GoogleMeetService],
})
export class GoogleMeetModule {}
