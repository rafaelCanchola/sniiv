import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "../ChartTemplate";
import * as d3 from "d3";
import {baseColor} from "../BaseColor";

//@ts-ignore
const choropletChartFunc = (divRef, ndx, modoValue,dashboard, valueAxis, dimensionAxis, groupAxis) => {
    //@ts-ignore
    const  dimension = ndx.dimension(d => d[dimensionAxis]);
    //@ts-ignore
    const group = dimension.group().reduceSum(d => (modoValue === 0)? d.monto : d[groupAxis])
    const choropletChart = dc.geoChoroplethChart(divRef,dashboard);
    //console.log(map[0])
    choropletChart
        .dimension(dimension)
        .group(group)
        .legend(dc.legend())
        .label(d=>'')
        .title(d => d.key + '\n' + d3.format((modoValue === 0)?'$,.0f':',.0f')(d.value))
        .ordinalColors(baseColor)
    return choropletChart

}
//@ts-ignore

export const ChoropletChart = props => (
    <ChartTemplate chartFunction={choropletChartFunc} title={props.titulo} modoValue={props.modoValue}/>
)
