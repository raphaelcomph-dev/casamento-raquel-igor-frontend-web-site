import { GiftItemDto } from "./gift-item.dto";

export class CheckoutMessageDto {
    name: string;
    phone: string;
    email: string;
    message: string;
    gifts: GiftItemDto[];
    createdDateTime: Date;
}
