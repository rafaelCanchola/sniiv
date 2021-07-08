import React from "react";
import { CxDContext } from "./Inicio/Graficas/CxDContext";

// @ts-ignore
export const ChartTemplate = props => {
    const context = React.useContext(CxDContext);
    const [chart,updateChart] = React.useState(null);
    // @ts-ignore
    const ndx = context.ndx;
    const div = React.useRef(null);
    React.useEffect(() => {
        // @ts-ignore
        const newChart = props.chartFunction(div.current, ndx, props.modoValue, context.dashboard, context.valueAxis, context.dimensionAxis, context.groupAxis);
        newChart.render();

        updateChart(newChart);
    },[ndx, props]);


    return (
        <div>
            <h3>{props.title}</h3>
            <div ref={div} >

            </div>
        </div>

    );
};
