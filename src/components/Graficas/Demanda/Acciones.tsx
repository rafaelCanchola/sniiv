import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../../Templates/ChartDemandaTemplate";

//@ts-ignore
const numberDisplayAcciones = (divRef, ndx, modoValue,seccion,aAxis, bAxis, cAxis, dAxis, eAxis, fAxis) => {
    //@ts-ignore
    const dimension = ndx.groupAll().reduceSum(d => d[cAxis]);
    const textFilter = dc.numberDisplay(divRef,seccion)
        .group(dimension)
        .formatNumber(d3.format(',.0f'))
        .valueAccessor(d => d);
    return textFilter

}

//@ts-ignore
const numberDisplayMontos = (divRef, ndx, modoValue,seccion,aAxis, bAxis, cAxis, dAxis, eAxis, fAxis) => {
    //@ts-ignore
    const dimension = ndx.groupAll().reduceSum(d => d[bAxis]);
    const textFilter = dc.numberDisplay(divRef,seccion)
        .group(dimension)
        .formatNumber(d3.format('$,.0f'))
        .valueAccessor(d => d);
    return textFilter

}
//@ts-ignore
export const MostrarAcciones = props => (
    <div>
        <h2>{props.titulo}</h2>
        <span onClick={() => {props.modoCallback(1);dc.filterAll(props.dashboard);}}>
            <ChartTemplate chartFunction={numberDisplayAcciones} title={'Acciones'} isButton={true} />
        </span>
        <span onClick={() => {props.modoCallback(0);dc.filterAll(props.dashboard);}}>
            <ChartTemplate chartFunction={numberDisplayMontos} title={'Montos'} isButton={true} />
        </span>

    </div>
)
