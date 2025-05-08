import { Controller, Get } from "@nestjs/common";
import { QueueOutpatientListUsecase } from "src/use-cases/outpatient/fetch-dashboard/queue-outpatient-list.use-case";

@Controller("notifications")
export class NotificationController {
    constructor(
        private queueOutpatientListUsecase: QueueOutpatientListUsecase
    ) {}

    @Get("queue")
    async fetchDashboardQueue() {
        return await this.queueOutpatientListUsecase.execute();
    }

}