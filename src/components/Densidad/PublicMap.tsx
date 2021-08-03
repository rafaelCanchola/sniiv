import React, { Component } from "react";
import OlMap from 'ol/Map';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlStyle from "ol/style/Style";
import WKT from "ol/format/WKT";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {Control, defaults as defaultControls} from 'ol/control';
import * as bases from '../webmapservices';

import './PublicMap.css'
import 'ol/ol.css'
import BaseLayer from "ol/layer/Base";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke} from "ol/style";
import {Select} from "ol/interaction";
import {transformExtent} from 'ol/proj';
import FetchURL from "../FetchURL";

interface PublicMapState{
    center:any,
    zoom:any
}

let userCreds:any;

const mapExtent = [-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293];
const mapLayers: BaseLayer[] = [
    new OlLayerTile({
        source: bases.b2
    }),
    new OlLayerTile({
        source: bases.b3
    }),
    new OlLayerTile({
        source: bases.b4
    }),
]

let agaveLayer = new OlLayerVector({

    opacity:0.8,
    style: function (feature,resolution) {
            const dens = feature.get('dens_ha');
            let color:any ;
            if (dens >= 0.08 && dens <= 174.29) {
                color='#FDF4EE';
            }
            else if (dens >= 174.30 && dens <= 390.63) {
                color='#F1B99E';
            }
            else if (dens >= 390.64 && dens <= 830.00) {
                color='#E76E4C';
            }
            else if (dens >= 830.01 && dens <= 1542.86) {
                color='#BA3124';
            }
            else{
                color='#531212';
            }
        return new OlStyle({stroke: new Stroke({color:"#fff", width:0.1}),fill:new Fill({color:color})});
        },
    source: new VectorSource({features:undefined})
});


let appliedLayers: BaseLayer[];
let counterLayers = 1;
let isAgaveLayerOn = false;

let select = new Select();
let selectedFeatures = select.getFeatures();

function actualizarLayers(sup:any){
    appliedLayers.map(layer => sup.removeLayer(layer));
    switch (counterLayers){
        case 1:
            appliedLayers = [mapLayers[0],agaveLayer];
            break;
        case 2:
            appliedLayers = [mapLayers[1],agaveLayer];
            break;
        case 3:
            appliedLayers = [mapLayers[2],agaveLayer];
            break;
    }
    appliedLayers.map(layer => sup.addLayer(layer))

}

const CambioCapaBase = /*@__PURE__*/(function (Control) {
    function ChangeLayer(opt_options:any) {

        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-earth';
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'capa-base ol-unselectable ol-control';
        element.appendChild(button);

        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });

        // @ts-ignore
        button.addEventListener('click', this.handleChangeLayer.bind(this), false);
    }

    if ( Control ) ChangeLayer.__proto__ = Control;
    ChangeLayer.prototype = Object.create( Control && Control.prototype );
    ChangeLayer.prototype.constructor = ChangeLayer;

    ChangeLayer.prototype.handleChangeLayer = function handleChangeLayer () {

        counterLayers+=1;
        if(counterLayers === 4){
            counterLayers = 1;
        }
        actualizarLayers(this.getMap())

    };
    return ChangeLayer;
}(Control));

const MostrarAgave = /*@__PURE__*/(function (Control) {

    function ShowAgave(opt_options:any) {
        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-group';
        button.id = "agave-button";
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'mostrar-agave ol-unselectable ol-control';
        element.appendChild(button);
        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });
        // @ts-ignore
        button.addEventListener('click', this.handleShowAgave.bind(this), false);
    }

        if ( Control ) ShowAgave.__proto__ = Control;
        ShowAgave.prototype = Object.create( Control && Control.prototype );
        ShowAgave.prototype.constructor = ShowAgave;

        ShowAgave.prototype.handleShowAgave = function handleShowAgave () {
            const filter =0;
            const pgsize = 3000;
            const extent = this.getMap().getView().calculateExtent();
            const transform = transformExtent(extent,'EPSG:3857','EPSG:4326')
            const xmin = transform[0];
            const ymin = transform[1];
            const xmax = transform[2];
            const ymax = transform[3];
            //console.log(extent)
            //console.log(transform)
            //@ts-ignore
            const handleSubmit = async () => {
                const pruebas = 'https://sniiv-cors.herokuapp.com/http://sniiv-env.eba-yt2cdarp.us-east-2.elasticbeanstalk.com/api/poligonosconteo';
                let route = pruebas +'?&filter='+filter+
                    '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax;
                let conteo = await fetch(route, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                conteo = await conteo.json()
                console.log(conteo)
                // @ts-ignore
                let hilos = parseInt(conteo/pgsize) + ((conteo%pgsize>0)?1:0)
                console.log(hilos)
                let rows = []
                for(var i = 0; i < hilos; i++){
                    rows.push(downloadPolygons({filter, pgnumber:i, pgsize,  xmin, ymin, xmax, ymax}))
                }
                const results = await Promise.all(rows)

                const dataPromises = results.map(result => result.json())
                const finalData = await Promise.all(dataPromises)
                let ag = finalData.map(data => data.map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})))
                console.log(ag)
                console.log("GEO")
                //let ag0 = finalData[0].map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}))
                //let ag1 = finalData[1].map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}))
                //let ag2 = finalData[2].map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}))
                //let ag3 = finalData[3].map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}))

                ag.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any;}, index: string | number) => geo.setProperties({id: finalData[0][index].id,cvegeo:finalData[0][index].cvegeo,dens_ha:finalData[0][index].dens_ha}))
                //ag0.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any; }, index: string | number) => geo.setProperties({id: finalData[0][index].id,cvegeo:finalData[0][index].cvegeo,dens_ha:finalData[0][index].dens_ha}))
                //ag1.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any; }, index: string | number) => geo.setProperties({id: finalData[1][index].id,cvegeo:finalData[1][index].cvegeo,dens_ha:finalData[1][index].dens_ha}))
                //ag2.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any; }, index: string | number) => geo.setProperties({id: finalData[2][index].id,cvegeo:finalData[2][index].cvegeo,dens_ha:finalData[2][index].dens_ha}))
                //ag3.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any; }, index: string | number) => geo.setProperties({id: finalData[3][index].id,cvegeo:finalData[3][index].cvegeo,dens_ha:finalData[3][index].dens_ha}))

                //let ag = agave.map(geo => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}))
                //@ts-ignore
                //ag.map((geo,index) => geo.setProperties({id: agave[index].id,cvegeo:agave[index].cvegeo,dens_ha:agave[index].dens_ha}))
                console.log(ag)

                //console.log(ag0)
                //console.log(ag1)
                //console.log(ag2)
                //console.log(ag3)
                return ag;
            }
            isAgaveLayerOn = !isAgaveLayerOn;
            if(isAgaveLayerOn){
                const buttonAga = document.getElementById("agave-button");
                // @ts-ignore
                buttonAga.disabled = true;
                // @ts-ignore
                buttonAga.style.cursor = "wait";
                //@ts-ignore
                buttonAga.children.item(0).className = "icon-flickr2";
                handleSubmit()
                    .then(
                        (wkt) =>{
                            agaveLayer.getSource().addFeatures(wkt)
                            actualizarLayers(this.getMap())
                            // @ts-ignore
                            document.getElementById("agave-button").style.backgroundColor = "#BA3124"
                        }
                    )
                    .catch(
                    ()=> isAgaveLayerOn = false
                    )
                    .finally(
                        () => {
                            // @ts-ignore
                            document.getElementById("agave-button").disabled=false;
                            // @ts-ignore
                            document.getElementById("agave-button").style.cursor ="pointer";
                            //@ts-ignore
                            document.getElementById("agave-button").children.item(0).className = "icon-group";
                        }
                    )

            }else{
                agaveLayer.getSource().clear();
                // @ts-ignore
                document.getElementById("agave-button").style.backgroundColor = "lightslategray";
            }
        };
        return ShowAgave;
    }(Control));



function downloadPolygons(cultivo:any) {
    const local = 'http://localhost:8080/api/poligonos';
    const pruebas = 'https://sniiv-cors.herokuapp.com/http://sniiv-env.eba-yt2cdarp.us-east-2.elasticbeanstalk.com/api/poligonos';

    let route =
        pruebas +'?&filter='+cultivo.filter+
        '&pgnumber=' + cultivo.pgnumber + '&pgsize=' + cultivo.pgsize +
        '&xmin=' + cultivo.xmin + '&xmax=' + cultivo.xmax + '&ymin=' + cultivo.ymin + '&ymax=' + cultivo.ymax;
    return fetch(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export default class PublicMap extends Component<any, PublicMapState> {
    private olmap: any;

    constructor(props:any) {
        super(props);
        userCreds = this.props.user;
        this.state = { center: [-11397253.55045682,2806837.5334897055], zoom: 5.2 };
        this.olmap = new OlMap({
            view: new OlView({
                //center: this.state.center,
                zoom: this.state.zoom,
                //minZoom:3,
                maxZoom:17,
                extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293],

            }),
            //@ts-ignore
            controls:defaultControls().extend([new CambioCapaBase(), new MostrarAgave(), new ScaleLine(), new MousePosition()]),

        });
        this.olmap.addInteraction(select)
        appliedLayers = [mapLayers[0]];
        this.olmap.addLayer(appliedLayers[0]);
        //actualizarLayers(this.olmap.getMap());
    }



    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);

    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
        });
        selectedFeatures.on('add', () =>{
            //console.log(selectedFeatures.item(0).getProperties());
            this.props.cultivoCallback(selectedFeatures.item(0).getProperties().id)
        });
        selectedFeatures.on('remove',() =>{
            this.props.cultivoCallback(undefined);
        })

    }


    shouldComponentUpdate(nextProps:any, nextState:any) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();

        //console.log(" center: "+this.state.center + ":"+ this.state.zoom);
        return !(center === nextState.center && zoom === nextState.zoom);
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
                <div id="map">

                </div>

        );
    }
}


