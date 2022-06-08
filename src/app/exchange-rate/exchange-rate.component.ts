import { Component, OnInit } from '@angular/core';
import { ExchangeRate } from '../models/exchange.model';
import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public exchangeRates: ExchangeRate | undefined;
  public testCurrency = 'EUR';

  constructor(private exchangeService: ExchangeRateService) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }

  private getExchangeRates(): void {
    this.exchangeService
      .getRates(this.testCurrency)
      .subscribe((data) => this.exchangeRatesLoaded(data));
  }

  private exchangeRatesLoaded(data: ExchangeRate): void {
    this.exchangeRates = data;
    //this.doStuff();
  }
}
