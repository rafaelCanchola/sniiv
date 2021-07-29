import ReactECharts from "echarts-for-react";
import React from "react";
import * as echarts from 'echarts/core';
import {colorBrewer} from "../colorBrewer";


export default function MapECharts(props:any){
    const data = props.data;
    const dataMap =
        data.map((d: { clave_entidad_federativa: any; clave_municipio:any, municipio:any, entidad: any; total: any; }) =>
            Object.assign({},(props.clave === '00')?
                {id:d.clave_entidad_federativa,name:d.entidad,value:d.total}:{id:d.clave_municipio,name:d.municipio,value:d.total}) )
    const min = Math.min.apply(null, dataMap.map((x: { value: any; }) => x.value));
    const max = Math.max.apply(null, dataMap.map((x: { value: any; }) => x.value));
    echarts.registerMap('mx',props.map)

    const optionsMap = {
        geo: {
            map: 'mx',
            label: {
                show: false,
            },
            emphasis:{
                focus:'none',
                label: {
                    show: false,
                }
            },
            select:{
                label:{
                    show:false,
                },
                itemStyle: {
                  areaColor:'#2171b5',
                },
            },
            roam: false,
            zoom: 1.25,
            itemStyle: {
                emphasis: {
                    areaColor: '#6baed6',
                },
            },
        },
        visualMap: {
            show: true,
            min: min,
            max: max,
            left:'left',
            top:'bottom',
            text:['max','min'],
            inRange:{
                color:colorBrewer.BuGn[11]
            },
            calculable: true,
        },
        series: [
            {
                name: props.clave,
                type: 'map',
                geoIndex: 0,
                data: dataMap,
            },
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>Total: {c}'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: true},
                saveAsImage: {
                    name:'diasInventarioMap',
                    type:'png',
                }
            }
        },
    };

    function onChartClick(param: any, echarts: any) {
        const claveEdo = (typeof param.data != 'undefined')?param.data.id:0;
        const nameEdo = (typeof param.data != 'undefined')?param.data.name:0;
        props.clave === '00'? props.callBack([claveEdo,nameEdo]) : <></>;
    };

    return(
        <div >
            <ReactECharts option={optionsMap} onEvents={{
                'click': onChartClick
            }}/>
        </div>
    )
}