import { Injectable } from "@angular/core";
import { GiftItemDto } from "../models/gift-item.dto";
import { AppUrls } from "../app.urls";
import { BehaviorSubject, Observable, Subject, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CheckoutMessageDto } from "../models/checkout-message.dto";

@Injectable({
    providedIn: "root",
})
export class GiftService {
    private cartItems: GiftItemDto[] = [];
    private cartItemsCount = new BehaviorSubject<number>(0);
    private cartItemsSubject = new BehaviorSubject<GiftItemDto[]>([]);
    private addNewItemsToCart = new Subject<any>();
    private _checkoutMessage: CheckoutMessageDto | null = null;

    cartItemsCount$ = this.cartItemsCount.asObservable();
    cartItems$ = this.cartItemsSubject.asObservable();
    addNewItemsToCart$ = this.addNewItemsToCart.asObservable();

    public get checkoutMessage(): CheckoutMessageDto {
        return this._checkoutMessage;
    }

    constructor(private http: HttpClient) {
        this.loadCartIfExists();
        this.loadCheckoutMessageIfExists();
    }

    getFindAll(): Observable<GiftItemDto[]> {
        return this.http.get(AppUrls.API_ENDPOINTS.GIFTS.FIND_ALL()).pipe(
            map((gifts) => {
                const convertedGifts: GiftItemDto[] = [];
                for (const key in gifts) {
                    if (gifts.hasOwnProperty(key)) {
                        convertedGifts.push({
                            ...gifts[key],
                            id: key,
                        });
                    }
                }
                return convertedGifts;
            })
        );
    }

    postCheckoutMessage(dto: CheckoutMessageDto): Observable<any> {
        localStorage.setItem("checkout-message", JSON.stringify(dto));
        return this.http.post(AppUrls.API_ENDPOINTS.GIFTS.POST_CHECKOUT_MESSAGE(), dto);
    }

    postCheckoutWithCreditCard(dtos: GiftItemDto[]): Observable<any> {
        return this.http.post<any>(AppUrls.API_ENDPOINTS.GIFTS.PAYMENT.CREDIT_CARD(), dtos);
    }

    addToCart(gift: GiftItemDto): boolean {
        if (this.cartItems.some((item) => item.id === gift.id)) {
            return false;
        }
        this.cartItems.push(gift);
        this.cartItemsCount.next(this.cartItems.length);
        this.cartItemsSubject.next(this.cartItems);
        this.addNewItemsToCart.next(gift.id);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
        return true;
    }

    removeFromCart(giftId: string): void {
        this.cartItems = this.cartItems.filter((gift) => gift.id !== giftId);
        this.cartItemsCount.next(this.cartItems.length);
        this.cartItemsSubject.next(this.cartItems);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }

    getCartItems(): Observable<GiftItemDto[]> {
        return this.cartItems$;
    }

    generatePixQrCode(): Observable<any> {
        return this.http.post(
            "https://pix.ae?chave=81998212130&tipo=celular&nome=Igor Resende Pinheiro&valor=285.90&info=Presente de Casamento de Raquel e Igor&txid=PresenteCasamento",
            {}
        );
    }

    private loadCartIfExists(): void {
        if (this.cartItems.length == 0) {
            const cart = localStorage.getItem("cart");
            if (cart) {
                this.cartItems = JSON.parse(cart);
                this.cartItemsCount.next(this.cartItems.length);
                this.cartItemsSubject.next(this.cartItems);
            }
        }
    }

    private loadCheckoutMessageIfExists(): void {
        const checkoutMessage = localStorage.getItem("checkout-message");
        if (checkoutMessage) {
            this._checkoutMessage = JSON.parse(checkoutMessage);
        }
    }
}
