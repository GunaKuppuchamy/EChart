import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { firstValueFrom } from 'rxjs';
import { ChartService } from '../data/chart.service';
import axisTrigger from 'echarts/types/src/component/axisPointer/axisTrigger.js';

type EChartsOption = echarts.EChartsOption;





@Component({
  selector: 'app-chart',
  imports: [FormsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})




export class ChartComponent implements OnInit, OnChanges {
  chartType = 'bar';




  weatherData: any[] = [];

  constructor(private weatherService: ChartService) { }

  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(this.weatherService.getData());
      this.weatherData = data;
      console.log('Weather data:', this.weatherData);
      this.viewEChart();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }


  }


  ngOnChanges(changes: SimpleChanges): void {
    this.viewEChart();
  }

  
  
  viewEChart() {
    const chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    myChart.clear(); 
    if (this.chartType === 'bar') {
      var option={};
      option = this.getBarChartOption();
      myChart.setOption(option)
    } else if (this.chartType === 'line') {
      var option={};
      option = this.getLineChartOption();
      myChart.setOption(option);
    } else if (this.chartType === 'pie') {
      var option={};
      option = this.getPieChartOption();
      myChart.setOption(option);
    }else if (this.chartType === 'radar') {
      var option={};
      option = this.getRadarChartOption();
      myChart.setOption(option);
    }else if (this.chartType === 'gauge') {
      var option={};
      option = this.getGaugeChartOption();
      myChart.setOption(option);
    }


  }

  getGaugeChartOption() {
    const temp = this.weatherData[0]?.temperatureC ?? 0;

    return {
      title: { text: 'Current Temperature Gauge', left : 'center'  },
      tooltip:{},
      series: [{
        type: 'gauge',
        progress: { show: true },
        detail: { valueAnimation: true, formatter: '{value} °C' },
        data: [{ value: temp, name: 'Temp °C' }]
      }]
    };
  }


  getRadarChartOption() {
    const indicators = this.weatherData.map(d => ({
      name: d.date,
      max: 50  // Adjust max based on expected temperature range
    }));

    return {

      title: { text: 'Temperature Radar (°C)' , left : 'center' },
      tooltip: {},
      radar: {
        indicator: indicators
      },
      series: [{
        name: 'Temp °C',
        type: 'radar',
        data: [{
          value: this.weatherData.map(d => d.temperatureC),
          name: 'Temperature'
        }]
      }]
    };
  }

 



  getBarChartOption() {
    return {
      title: { text: 'Temperature Forecast (°F)', left : 'center' },
      tooltip: {},
      xAxis: {
        type: 'category',
        name: 'date',
        data: this.weatherData.map(d => d.date)
      },
      yAxis: {
        type: 'value',
        name: 'Tetmperature in  °F',
      },
      series: [{
        data: this.weatherData.map(d => d.temperatureF),
        type: 'bar',
      }]
    };
  }

  getLineChartOption() {
    return {
      title: { text: 'Temperature Forecast (°C)', left : 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        
        type: 'category',
        data: this.weatherData.map(d => d.date)
      },
      yAxis: {
        type: 'value',
        name: 'Tetmperature in °C'
      },
      series: [{
        data: this.weatherData.map(d => d.temperatureC),
        type: 'line',
        // smooth: true
      }]
    };
  }


  getPieChartOption() {
    const summaryMap: { [key: string]: string[] } = {};

    this.weatherData.forEach(item => {
      if (!summaryMap[item.summary]) {
        summaryMap[item.summary] = [];
      }
      summaryMap[item.summary].push(item.date); 
    });

    const pieData = Object.entries(summaryMap).map(([summary, dates]) => ({
      name: summary,
      value: dates.length,
      tooltipData: dates.join(', ')
    }));

    return {
      title: { text: 'Summary Distribution', left: 'center' },
      tooltip: { trigger: 'item',
        formatter: (params: any) => {
          return `
            <strong>${params.name}</strong><br/>
            Count: ${params.value}<br/>
            Dates: ${params.data.tooltipData}
          `;
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      grid: { 
        show: false 
      },
      series: [{
        name: 'Summary',
        type: 'pie',
        radius: '50%',
        data: pieData
      }]
    };
  }









}
