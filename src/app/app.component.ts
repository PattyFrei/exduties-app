import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = "Exchange'n'Duties App";

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public onChangeLanguage(event: any): void {
    const url = event.target.src;
    if (url) {
      const filename = new URL(url).pathname.split('/').pop();
      const language = filename?.split('.')[0];
      if (language === 'en' || language === 'de') {
        this.translate.use(language);
      }
    }
  }
}
