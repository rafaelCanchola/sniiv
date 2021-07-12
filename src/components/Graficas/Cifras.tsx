import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../ChartTemplate";

//@ts-ignore
const numberDisplayAcciones = (divRef, ndx, modoValue, dashboard) => {
    //@ts-ignore
    const dimension = ndx.groupAll().reduceSum(d => d.acciones);
    const textFilter = dc.numberDisplay(divRef,dashboard)
        .group(dimension)
        .formatNumber(d3.format(',.0f'))
        .valueAccessor(d => d);

    return textFilter

}
//@ts-ignore
const numberDisplayMontos = (divRef, ndx, modoValue, dashboard) => {
    //@ts-ignore
    const dimension = ndx.groupAll().reduceSum(d => d.monto);
    const textFilter = dc.numberDisplay(divRef,dashboard)
        .group(dimension)
        .formatNumber(d3.format('$,.0f'))
        .valueAccessor(d => d);

    return textFilter

}
//@ts-ignore
export const MostrarCifras = props => (
    <div>
        <h3>{props.titulo}</h3>
        <span onClick={() => {props.modoCallback(1);dc.filterAll(props.dashboard);}}>
            <ChartTemplate chartFunction={numberDisplayAcciones}title="Acciones" isButton={true} />
        </span>

        <span onClick={() => {props.modoCallback(0);dc.filterAll(props.dashboard)}}>
            <ChartTemplate chartFunction={numberDisplayMontos}title="Montos" isButton={true} />
        </span>
    </div>
)
