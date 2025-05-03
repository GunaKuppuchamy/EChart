import { Component, OnInit } from '@angular/core';
import { ChartService } from '../data/chart.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent  {
  title="Angular ECharts";
  description="This Application is to Visualize the Echarts about Weather details by fetching data using API created using C#"

}
