export class CreateDeviceManagementHistoryDto {
    type: string;
    amount: number;
    remainingAmount: number;
    date: Date;
    expirationDate?: Date;
    details: string;
    manageToolsId: number;
}
