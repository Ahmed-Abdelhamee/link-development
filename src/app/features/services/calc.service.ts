import { Injectable} from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  cartValue:BehaviorSubject<any> = new BehaviorSubject(0);

  constructor() { }

  calculation(arr : Course[]){
    let totalPrice = 0 , totalDiscount = 0 , taxAmount = 0, total = 0;
    arr.forEach(ele=> {
      totalPrice += ele.price;
      totalDiscount += ele.price * (ele.discount / 100);
    });
    taxAmount =( totalPrice - totalDiscount ) * (3.42 / 100);
    total = totalPrice - totalDiscount + taxAmount;
    this.cartValue.next({totalPrice, totalDiscount,taxAmount,total})
  }
}
