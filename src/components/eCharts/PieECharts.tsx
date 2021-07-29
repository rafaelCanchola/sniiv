import {baseColor} from "../BaseColor";
import ReactECharts from "echarts-for-react";
import React from "react";

export default function PieECharts(props:any){
    const data = props.data;
    const optionsPie = {
        legend:{
            orient:'vertical',
            left:'left',
            top:'center',
            data:data.map((d: { name: any; }) => d.name)
        },
        toolbox:{
            show:true,
            orient:'vertical',
            left: 'right',
            top: 'center',
            feature:{
                saveAsImage: {
                    name:'diasInventarioPie',
                    type:'png',
                }
            }
        },
        color: baseColor,
        series: [
            {
                type: 'pie',
                name: 'Días de Inventario',
                center:['50%','60%'],
                label:{
                    normal:{
                        formatter:'{d}%'
                    }
                },
                data:data,
            },
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}: {c} ({d}%)'
        },
    };
    return(
        <div>
            <ReactECharts option={optionsPie} />
        </div>
    )
}