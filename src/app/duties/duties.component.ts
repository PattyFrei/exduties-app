import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-duties',
  templateUrl: './duties.component.html',
  styleUrls: ['./duties.component.scss'],
})
export class DutiesComponent {
  @Input() totalCosts: number = 0;
  @Input() convertTo: string = '';

  public isEuLocation = false;
  public standardTax = 0.19;
  public reducedTax = 0.07;
  public isStandardTax = true;

  constructor() {}

  public calculateImport(): void {}

  public onEuLocationChange(isEU: boolean) {
    this.isEuLocation = isEU;
  }

  public onIsDeStandardTaxChange() {
    this.isStandardTax = !this.isStandardTax;
  }

  public getTaxRate(): number {
    return this.isStandardTax ? this.standardTax : this.reducedTax;
  }

  public calculateTotalCostsWithoutTax(): string {
    return this.totalCosts.toFixed(2);
  }

  public calculateSalesTax(): number {
    return this.totalCosts * this.getTaxRate();
  }

  public calculateTotalCosts(): number {
    if (!this.isEuLocation) {
      return this.totalCosts + this.calculateSalesTax();
    } else {
      return this.totalCosts;
    }
  }

  public hasDuties(): boolean {
    return this.calculateTotalCosts() >= 150;
  }

  public getTotalCostsWithDuties(rate: number): number {
    const totalCosts = this.calculateTotalCosts();
    return totalCosts + totalCosts * rate;
  }
}
