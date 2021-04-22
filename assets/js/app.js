// set chart params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, bottom: 60, right: 40, left: 50};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//import from csv
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData);
    // cast values as number
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcareLow = +data.healthcareLow;
    })
    //scaling functions
    var xScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcareLow)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);

    var leftAxis = d3.axisLeft(yScale);
    
    // add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // add y-axis
    chartGroup.append("g")
        .classed("blue", true)
        .call(leftAxis);

    // add plots
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .selectAll("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcareLow))
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
});