import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3'; 

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  @ViewChild('chart') chartElement: ElementRef;
  @Input() data: [];

  private svgElement: HTMLElement;
  private chartProps: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    /*if(this.data){
      this.buildChart();
    }*/
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.buildChart();
  }

  buildChart() {
    this.chartProps = {};
  
    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;
  
    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x);
    var yAxis = d3.axisLeft(this.chartProps.y).ticks(5);
  
    let _this = this;
  
    // Define the line
    var valueline = d3.line<any>()
      .x(function (d) {
        if (d.date instanceof Date) {
          return _this.chartProps.x(d.date.getTime());
        }
      })
      .y(function (d) { console.log('Close market'); return _this.chartProps.y(d.close); });
  
    // Define the line
    var valueline2 = d3.line<any>()
      .x(function (d) {
        if (d.date instanceof Date) {
          return _this.chartProps.x(d.date.getTime());
        }
      })
      .y(function (d) { console.log('Open market'); return _this.chartProps.y(d.open); });
  
    var svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Scale the range of the data
    this.chartProps.x.domain(
      d3.extent(_this.data, function (d) {
        if (d.date instanceof Date)
          return (d.date as Date).getTime();
      }));
    this.chartProps.y.domain([0, d3.max(this.data, function (d) {
      return Math.max(d.close, d.open);
    })]);
  
    // Add the valueline2 path.
    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'green')
      .style('fill', 'none')
      .attr('d', valueline2(_this.data));
  
    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', valueline(_this.data));
  
  
    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);
  
    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  
    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }

}