export interface BillUpdatedEvent {

    id: string;
    restaurantId: string;
    status: string;
    items: any[];
}

export interface PaymentCompletedEvent {

    id: string;
    billId: string;
    restaurantId: string;
    amount: number;
}
