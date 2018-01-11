var data; //TEST DATA


function plotData(){
    var width = $(".map").width();
    var height = $(".map").height();
     $.ajax({
            url: '/getWW1Wreck',
            type: 'GET',
            success: function(res) {
                console.log(res);
                data = JSON.parse(res);
                console.log(data);
                console.log(data[0]);
                console.log(data[0].Name);


                for(var i = 0; i < data.length; i++)
                {
                    console.log(data[i].Name);
                    console.log(data[0].X);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d[0]; })])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){ return d[1]; })])
        .range([0, height]);

    var graph = d3.select(".map")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "mapSVG");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "X: " + d[0] + "</br>"
            + "Y: " + d[1];
        })

    graph.call(tip);

    graph.selectAll("scatter-dots")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d, i) { return x(d[0]); } )
            .attr("cy", function(d, i) { return y(d[1]); } )
            .attr("r", 5)
            .attr("fill", "red")
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

}

window.onload = function() {
    console.log("DOM loaded!");
    console.log(data);
    plotData();
};
