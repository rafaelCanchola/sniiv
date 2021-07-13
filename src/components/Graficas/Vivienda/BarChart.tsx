import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "../../Templates/ChartViviendaTemplate";
import * as d3 from "d3";
import {baseColor} from "../../BaseColor";

//@ts-ignore
const barChartFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis,dAxis, eAxis) => {
    //@ts-ignore
    const  dimension = ndx.dimension(d => d[eAxis]);
    //@ts-ignore
    const group = dimension.group().reduceSum(d => (modoValue === 0)? d.monto : d[cAxis])
    const barChart = dc.barChart(divRef,seccion);
    barChart
        .dimension(dimension)
        .group(group)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .renderLabel(true)
        .label(d=>d3.format(',.0f')(d.y))
        .title(d => '')
        .barPadding(0.1)
        .ordinalColors(baseColor)

    barChart.yAxis().tickFormat(d3.format('~s'))
    return barChart

}
//@ts-ignore

export const BarChart = props => (
    <ChartTemplate chartFunction={barChartFunc} title={props.titulo} modoValue={props.modoValue}/>
)