import { Component, OnInit } from '@angular/core';
import { ExchangeRate } from '../models/exchange.model';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { CURRENCIES } from '../models/currencies';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public totalCosts: number = 0;
  public convertToCurrency: string = '';

  public buttonCta = 'Calculate import costs';
  public convertFrom = 'USD';
  public convertTo = 'EUR';
  public currencies = CURRENCIES;
  public exchangeRates: ExchangeRate | undefined;
  public isImport = false;
  public shouldRecalculate = false;

  public purchaseCosts: number = 0;
  public shippingCosts: number = 0;
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

  public convertPurchaseValue(): number {
    if (this.exchangeRates) {
      const purchaseCosts =
        this.purchaseCosts *
        this.exchangeRates.conversion_rates[this.convertTo];
      return purchaseCosts;
    } else return 0;
  }

  public convertShippingCosts(): number {
    if (this.exchangeRates) {
      const shippingCosts =
        this.shippingCosts *
        this.exchangeRates.conversion_rates[this.convertTo];
      return shippingCosts;
    } else return 0;
  }

  public onConvertFromChange(event: string): void {
    if (event === this.convertTo) {
      this.convertTo = this.previousConvertFrom;
      this.previousConvertFrom = this.convertFrom;
      this.previousConvertTo = this.convertTo;
    }
    this.getExchangeRates();
    this.toggleRecalculateButtonFlash();
  }

  public onConvertToChange(event: string): void {
    if (event === this.convertFrom) {
      this.convertFrom = this.previousConvertTo;
      this.previousConvertTo = this.convertTo;
      this.previousConvertFrom = this.convertFrom;
      this.getExchangeRates();
    }
    this.toggleRecalculateButtonFlash();
  }

  public getTotalCosts(): number {
    return this.convertShippingCosts() + this.convertPurchaseValue();
  }

  public calculateImportCosts(): void {
    this.isImport = true;
    this.buttonCta = 'Recalculate import costs';
    this.convertToCurrency = this.convertTo;
    this.totalCosts = this.getTotalCosts();
    this.toggleRecalculateButtonFlash(true);
  }

  public onCostsChange(): void {
    this.toggleRecalculateButtonFlash();
  }

  private toggleRecalculateButtonFlash(shouldReset: boolean = false): void {
    if (shouldReset) {
      this.shouldRecalculate = false;
      return;
    }
    if (this.buttonCta === 'Recalculate import costs') {
      this.shouldRecalculate = true;
    }
  }
}
