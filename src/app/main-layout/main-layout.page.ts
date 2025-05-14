import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>แอป Todo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <router-outlet></router-outlet>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-buttons>
          <ion-button [routerLink]="['/home']">หน้าแรก</ion-button>
          <ion-button [routerLink]="['/about']">เกี่ยวกับ</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  `,
  imports: [
    RouterModule,
    IonContent,
    IonFooter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons
  ]
})
export class MainLayoutPage {}
