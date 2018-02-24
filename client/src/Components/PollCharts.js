import React from 'react';
import * as d3 from 'd3';

class PollCharts extends React.Component {
    constructor(props) {
        super(props);
        this.drawGraph = this.drawGraph.bind(this);
    }

    componentDidMount() {
        d3.select('body').append('div')
            .attr('class', 'tip')
            .style('left', 0)
            .style('opacity', 0);
        this.drawGraph();
        window.onresize = this.drawGraph;
    }

    componentDidUpdate() {
        this.drawGraph();
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    drawGraph() {
        d3.select('svg').remove();
        const data = this.props.poll.options;
        const highestVote = d3.max(data, function(d) { return d.votes })

        const totalWidth = document.getElementById('graph').offsetWidth;
        const totalHeight = document.getElementById('graph').offsetHeight;
        const margin = {top: 50, left: 50, bottom: 50, right: 50}
        const width = totalWidth - margin.left - margin.right;
        const height = totalHeight - margin.top - margin.bottom;

        const svg = d3.select('#graph').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.left)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const yScale = d3.scaleLinear()
            .domain([0, highestVote])
            .rangeRound([height, 0]);

        const xScale = d3.scaleBand()
            .domain(data.map(function(d) { return d.name }))
            .rangeRound([0, width])
            .padding(0.2)
            .round(true);

        svg.append('g').call(d3.axisLeft(yScale).ticks(highestVote))
            .append('text')
            .attr('y', -10)
            .attr('x', 5)
            .style('fill', 'black')
            .style('text-anchor', 'end')
            .text('Votes');
        svg.append('g').call(d3.axisBottom(xScale))
            .attr('transform', 'translate(0,' + height + ')');

        const showTip = function(d) {
            d3.select('.tip').transition(500).style('opacity', 0.8);
            d3.select('.tip').html("<p>" + d.name + ": " + d.votes + "</p>")
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY) + 'px')
        }

        const moveTip = function() {
            d3.select('.tip').style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 40) + 'px')
        }

        const hideTip = function(d) {
            d3.select('.tip').transition(500).style('opacity', 0).style('left', 0);
        }

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) { return xScale(d.name) })
            .attr('y', function(d) { return yScale(d.votes) })
            .attr('width', xScale.bandwidth())
            .attr('height', function(d) { return height - yScale(d.votes) })
            .attr('fill', 'steelblue')
            .on('mouseover', showTip)
            .on('mousemove', moveTip)
            .on('mouseout', hideTip);

        // bars.transition().duration(400);

        // bars.exit().transition().duration(200).remove();
    }

    render() {
        return (
            <div>
                <h4>{this.props.poll.title}</h4>
                <div id='graph'></div>
            </div>
        )
    }
}

export default PollCharts;