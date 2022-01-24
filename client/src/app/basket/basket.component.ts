import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$!:Observable<IBasket | null>;
  constructor(private basketservice:BasketService) { }

  ngOnInit(): void {
    this.basket$= this.basketservice.basket$;
  }
  removeBasketItem(item:IBasketItem){
    this.basketservice.removeItemFromBasket(item);
  }
  incrementItemQuantity(item:IBasketItem){
    this.basketservice.incrementItemQuantity(item);
  }
  decrementItemQuantity(item:IBasketItem){
    this.basketservice.decrementItemQuantity(item);
  }
}
