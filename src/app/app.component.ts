import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { TitleComponent } from './title/title.component';

@Component({
  selector: 'app-root',
  imports: [ ChartComponent,TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'echarts';
}
