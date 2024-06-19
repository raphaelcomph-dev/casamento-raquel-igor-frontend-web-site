import { Injectable } from "@angular/core";
import { GiftItemDto } from "../models/gift-item.dto";
import { AppUrls } from "../app.urls";
import { BehaviorSubject, Observable, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class GiftService {
    private cartItems: GiftItemDto[] = [];
    private cartItemsCount = new BehaviorSubject<number>(0);
    private cartItemsSubject = new BehaviorSubject<GiftItemDto[]>([]);

    cartItemsCount$ = this.cartItemsCount.asObservable();
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadCartIfExists();
    }

    findAll(): Observable<GiftItemDto[]> {
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

    addToCart(gift: GiftItemDto): void {
        this.cartItems.push(gift);
        this.cartItemsCount.next(this.cartItems.length);
        this.cartItemsSubject.next(this.cartItems);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
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
}
