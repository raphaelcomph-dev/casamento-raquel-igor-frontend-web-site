import { GiftItemDto } from "./gift-item.dto";

export class CheckoutMessageDto {
    id?: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    gifts: GiftItemDto[];
    createdDateTime: Date;

    constructor(partial: Partial<CheckoutMessageDto>) {
        Object.assign(this, partial);
    }

    giftsTotalPrice(): number {
        return this.gifts ? this.gifts.reduce((total, gift) => total + gift.price, 0) : 0;
    }

    giftsNames(): string {
        return this.gifts ? this.gifts.map((gift) => gift.name).join("; ") : "";
    }
}
