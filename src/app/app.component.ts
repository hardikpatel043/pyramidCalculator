import { Component } from '@angular/core';

export class Trade {
  qty: number;
  entry: number;

  constructor(qty: number, entry: number) {
    this.qty = qty;
    this.entry = entry;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pyramidicCalc';
  qty = 25;
  entry = 0;
  risk = 500;
  totalQty = 0;
  averageEntry = 0;
  tradeList: Trade[] = [];
  sl = 0;
  constructor() {}

  onAdd(): void {
    this.tradeList.push(new Trade(this.qty, this.entry));
    this.totalQty = this.tradeList.length * this.qty;
    this.averageEntry = this.getAverageEntry();
    this.sl = this.calculateStopLoss();
  }

  getAverageEntry(): number {
    const allEntries = this.tradeList.map((a) => a.entry);
    console.log(allEntries);
    return allEntries.reduce((a, b) => a + b, 0) / this.tradeList.length;
  }

  calculateStopLoss(): number {
    const pipe = this.risk / this.totalQty;
    return this.averageEntry - pipe;
  }
}
