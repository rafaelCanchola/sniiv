import React from "react";
import { CxDContext } from "../Graficas/Context/ViviendaContext";

// @ts-ignore
export const ChartTemplate = props => {
    const context = React.useContext(CxDContext);
    const [chart,updateChart] = React.useState(null);
    // @ts-ignore
    const ndx = context.ndx;
    const div = React.useRef(null);
    React.useEffect(() => {
        // @ts-ignore
        const newChart = props.chartFunction(div.current, ndx, props.modoValue, context.seccion, context.aAxis, context.bAxis, context.cAxis, context.dAxis, context.eAxis, context.fAxis, context.map);
        newChart.render();

        updateChart(newChart);
    },[ndx, props]);


    return (
        <div>
            <h4>{props.title}</h4>
            {props.isButton?
                <div ref={div} ></div>:
                <div ref={div} style={{fontSize:10}} ></div>
            }
        </div>

    );
};
