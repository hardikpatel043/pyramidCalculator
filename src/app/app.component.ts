import { Component } from '@angular/core';

export class Trade {
  qty: number;
  entry: number;
  pl: number;
  constructor(qty: number, entry: number) {
    this.qty = qty;
    this.entry = entry;
    this.pl = 0;
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
  totalPL = 0;
  addition = 20;
  newEntry = 0;
  constructor() {}

  onAdd(): void {
    this.tradeList.push(new Trade(this.qty, this.entry));
    this.totalQty = this.tradeList.length * this.qty;
    this.averageEntry = this.getAverageEntry();
    this.sl = this.calculateStopLoss();
    this.calculateProfit();
    this.totalPL = this.calculateTotalPL();
    this.newEntry = this.entry;
  }

  onAddMore(): void {
    this.newEntry += this.addition;
    this.tradeList.push(new Trade(this.qty, this.newEntry));
    this.totalQty = this.tradeList.length * this.qty;
    this.averageEntry = this.getAverageEntry();
    this.sl = this.calculateStopLoss();
    this.calculateProfit();
    this.totalPL = this.calculateTotalPL();
  }

  getAverageEntry(): number {
    const allEntries = this.tradeList.map((a) => a.entry);
    return allEntries.reduce((a, b) => a + b, 0) / this.tradeList.length;
  }

  calculateStopLoss(): number {
    const pipe = this.risk / this.totalQty;
    return this.averageEntry - pipe;
  }

  calculateProfit(): void {
    if (this.tradeList.length < 2) {
      return;
    }

    this.tradeList.forEach((trade, idx) => {
      if (idx === this.tradeList.length - 1) {
      } else {
        const lastTrade = this.tradeList[this.tradeList.length - 1];

        trade.pl = (lastTrade.entry - trade.entry) * trade.qty;
      }
    });
  }

  calculateTotalPL(): number {
    const allEntries = this.tradeList.map((a) => a.pl);
    return allEntries.reduce((a, b) => a + b, 0);
  }
}
