import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "../../Templates/ChartViviendaTemplate";
import * as d3 from "d3";
import {baseColor} from "../../BaseColor";

//@ts-ignore
const quarterChartFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis, dAxis, eAxis) => {
    //@ts-ignore
    const  dimension = ndx.dimension(d => d[aAxis]);
    //@ts-ignore
    const group = dimension.group().reduceSum(d => (modoValue === 0)? d.monto : d[cAxis])
    const quarterChart = dc.pieChart(divRef,seccion);
    quarterChart
        .innerRadius(50)
        .dimension(dimension)
        .group(group)
        .legend(dc.legend())
        .label(d=>'')
        .title(d => d.key + '\n' + d3.format((modoValue === 0)?'$,.0f':',.0f')(d.value))
        .ordinalColors(baseColor)
    return quarterChart

}
//@ts-ignore

export const PieChart = props => (
    <ChartTemplate chartFunction={quarterChartFunc} title={props.titulo} modoValue={props.modoValue}/>
)
