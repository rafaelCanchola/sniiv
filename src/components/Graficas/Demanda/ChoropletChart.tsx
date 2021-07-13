import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "../../Templates/ChartDemandaTemplate";
import * as d3 from "d3";
import * as geoJson from "../../../json/mx.json"
import {colorBrewer} from "../../colorBrewer";

//toma como parametros el cAxis y dAxis
//@ts-ignore
const choropletChartFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis, dAxis, eAxis, fAxis) => {
    //@ts-ignore
    const  dimension = ndx.dimension(d => d[dAxis]);
    //@ts-ignore
    const group = dimension.group().reduceSum(d => (modoValue === 0)? d[bAxis] : d[cAxis])
    const choropletChart = dc.geoChoroplethChart(divRef,seccion);
    const estados = group.all();
    const min = Math.min.apply(null,estados.map((x: { value: any; }) => x.value))
    const max = Math.max.apply(null,estados.map((x: { value: any; }) => x.value))
    choropletChart
        .height(400)
        .minWidth(650)
        .dimension(dimension)
        .group(group)
        //@ts-ignore
        .colors(colorBrewer.BuGn[10])
        .colorDomain([min,max])
        //@ts-ignore
        .colorCalculator(d => d? choropletChart.colors()(d) :'#ccc')
        .overlayGeoJson(geoJson.features,'name',d=>d.properties.name)
        //@ts-ignore
        .projection(d3.geoAlbers().rotate([98, 19, 5]).scale(1200))
        .title(d=> d.key + ': '+d3.format((modoValue === 0)?'$,.0f':',.0f')(d.value))

    return choropletChart

}

//@ts-ignore
export const ChoropletChart = props => (
    <ChartTemplate chartFunction={choropletChartFunc} title={props.titulo} modoValue={props.modoValue} context={props.context}/>
)
