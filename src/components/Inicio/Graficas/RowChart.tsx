import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../../ChartTemplate";
import {baseColor} from "../../BaseColor";

//@ts-ignore
const barFunc = (divRef, ndx, modoValue, dashboard, valueAxis, dimensionAxis, groupAxis) => {
    const verticalBarChart = dc.rowChart(divRef,dashboard)
    //@ts-ignore
    const dimensionChart = ndx.dimension( d => d[valueAxis]);
    //@ts-ignore
    const groupChart = dimensionChart.group().reduceSum(d => (modoValue === 0)? d.monto : d[groupAxis]);

    verticalBarChart
        .minWidth(600)
        .dimension(dimensionChart)
        .group(groupChart)
        .elasticX(true)
        .x(d3.scaleLinear().domain([1,1000]))
        .margins({top:5,left:5,right:10,bottom:20})
        .label(d => d.key + ": "+ d3.format((modoValue === 0)?'$,.0f':',.0f')(d.value))
        .title(d => '')
        .ordinalColors(baseColor)

    verticalBarChart.xAxis().tickFormat(d3.format('s'))
    return verticalBarChart
}
//@ts-ignore
export const RowChart = props => (
    <ChartTemplate chartFunction={barFunc} title={props.titulo} modoValue={props.modoValue}/>
)

