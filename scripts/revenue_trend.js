
// add data
var Platform = [
   {Year: "2017", value: 9.261},
   {Year: "2018", value: 10.720},
   {Year: "2019", value: 12.910},
   {Year: "2020", value: 19.480},
   {Year: "2021", value: 28.120}
];

var Restaurant = [
   {Year: "2017", value: 14.090},
   {Year: "2018", value: 15.810},
   {Year: "2019", value: 18.070},
   {Year: "2020", value: 24.650},
   {Year: "2021", value: 28.790}
];

// set the graph
var margin = {top: 30, right: 30, bottom: 60, left: 30},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// svg
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// add X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(Platform.map(function(d) { return d.Year; }))
  .padding(0.1);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// add Y axis
var y = d3.scaleLinear()
  .domain([0, 30])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

// update function
function update(data) {

  var u = svg.selectAll("rect")
    .data(data)
    
    u.enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(500)
      .attr("x", function(d) { return x(d.Year); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "cornflowerblue")
}

update(Platform)