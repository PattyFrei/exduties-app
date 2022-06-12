import { Component, OnInit } from '@angular/core';
import { ExchangeRate } from '../models/exchange.model';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency, CURRENCIES } from '../models/currencies';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public convertFrom = 'USD';
  public convertTo = 'EUR';
  public currencies = CURRENCIES;
  public exchangeRates: ExchangeRate | undefined;
  public purchaseValue: number | undefined;
  private previousConvertFrom = this.convertFrom;
  private previousConvertTo = this.convertTo;

  constructor(private exchangeService: ExchangeRateService) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }

  private getExchangeRates(): void {
    this.exchangeService
      .getRates(this.convertFrom)
      .subscribe((data) => this.exchangeRatesLoaded(data));
  }

  private exchangeRatesLoaded(data: ExchangeRate): void {
    this.exchangeRates = data;
  }

  public convertPurchaseValue(): number | string {
    if (this.purchaseValue && this.exchangeRates) {
      return (
        this.purchaseValue * this.exchangeRates.conversion_rates[this.convertTo]
      ).toFixed(2);
    } else return '';
  }

  public onConvertFromChange(event: string): void {
    if (event === this.convertTo) {
      this.convertTo = this.previousConvertFrom;
      this.previousConvertFrom = this.convertFrom;
      this.previousConvertTo = this.convertTo;
    }
    this.getExchangeRates();
  }

  public onConvertToChange(event: string): void {
    if (event === this.convertFrom) {
      this.convertFrom = this.previousConvertTo;
      this.previousConvertTo = this.convertTo;
      this.previousConvertFrom = this.convertFrom;
      this.getExchangeRates();
    }
  }
}
