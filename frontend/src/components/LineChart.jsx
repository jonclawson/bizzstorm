import { useEffect } from "react";
import * as d3 from 'd3';

export const LineChart = ({data}) => {

  const createCanvas = async () => {
    // let tsv = 'https://gist.githubusercontent.com/mbostock/1550e57e12e73b86ad9e/raw/01fc42b079d864b9eae8f6e3d150f0f5f2c26c50/data.tsv';

    var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");
    canvas.width = document.querySelector("#chart-container").offsetWidth;
    canvas.height = canvas.width / 2;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = document.querySelector("#chart-container").offsetWidth - margin.left - margin.right,
    height = canvas.height - margin.top - margin.bottom;

    // var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime()
    .range([0, width]);

    var y = d3.scaleLinear()
    .range([height, 0]);

    var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    // .curve(d3.curveStep)
    .context(context);

    context.translate(margin.left, margin.top);

    // d3.tsv(tsv, function(d) {
    // d.date = parseTime(d.date);
    // d.close = +d.close;
    // return d;
    // })
    // .then(function(data) {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

    xAxis();
    yAxis();

    context.beginPath();
    line(data);
    context.lineWidth = 1.5;
    context.strokeStyle = "steelblue";
    context.stroke();


    // var dataURL = canvas.toDataURL();
    // document.querySelector('export-container').append(`<img src="${dataURL}/>`)

    // });

    function xAxis() {
        var tickCount = 10,
        tickSize = 6,
        ticks = x.ticks(tickCount),
        tickFormat = x.tickFormat();

        context.beginPath();
        ticks.forEach(function(d) {
          context.moveTo(x(d), height);
          context.lineTo(x(d), height + tickSize);
        });
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.moveTo(0, height);
        context.lineTo(0, height);
        context.lineTo(width, height);
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "top";
        ticks.forEach(function(d) {
        context.fillText(tickFormat(d), x(d), height + tickSize);
        });
    }

    function yAxis() {
        var tickCount = 10,
        tickSize = 6,
        tickPadding = 3,
        ticks = y.ticks(tickCount),
        tickFormat = y.tickFormat(tickCount);

        context.beginPath();
        ticks.forEach(function(d) {
        context.moveTo(0, y(d));
        context.lineTo(-6, y(d));
        });
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.moveTo(-tickSize, 0);
        context.lineTo(0.5, 0);
        context.lineTo(0.5, height);
        context.lineTo(-tickSize, height);
        context.strokeStyle = "black";
        context.stroke();

        context.textAlign = "right";
        context.textBaseline = "middle";
        ticks.forEach(function(d) {
        context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
        });

        context.save();
        context.rotate(-Math.PI / 2);
        context.textAlign = "right";
        context.textBaseline = "top";
        context.font = "bold 10px sans-serif";
        context.fillText("", -10, 10);
        context.restore();
    }
  }
  const createGraph = async () => {

    // read data from csv and format variables
    // let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
    var parseTime = d3.timeParse("%Y-%m-%d");
  
    // data.forEach((d) => {
    //   d.date = parseTime(d.date);
    //   d.value = +d.value;
    // });

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = document.querySelector("#chart-container").offsetWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    d3.select("#line-chart svg").remove()

    var svg = d3.select("#line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain(d3.extent(data, (d) => { return d.value; }));
  
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
      
    // add the Line
    var valueLine = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.value); });
  
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);

  }

  useEffect(() => {
    // createGraph();
    createCanvas();
  }, []);

  return (
    <>
    <canvas ></canvas>
    <div id="line-chart" width="100%"></div>
    </>
  );
}