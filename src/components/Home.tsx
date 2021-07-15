import React, {Component} from 'react';

import CrossCharts from "./Inicio/CrossCharts";
import AccionesCharts from "./Inicio/AccionesCharts";
import {Tab, Tabs} from "@material-ui/core";

/*import {subsidios} from "../json/subsidios";
import {financiamientos} from "../json/financiamientos";
import {pcu} from "../json/pcu";
import {inventario} from "../json/inventario";*/
import Fetch from "./Fetch";


const handleApi = async(route:any) => {
    return await Fetch(route);
}
const subsidiosRoute = 'getKPIsCONAVI'
const financiamientosRoute = 'getKPIsFinanciamientos'
const pcuRoute = 'getKPIsRegistro'
const inventarioRoute = 'getKPIsInventario'

export default class Home extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {value:0,subsidios:[],financiamientos:[],controlSub:false,controlFin:false,pcu:[],inventario:[],controlPcu:false,controlInv:false}
    }

    componentDidMount() {
        handleApi(subsidiosRoute).then(data => this.setState({subsidios:data,controlSub:true}))
        handleApi(financiamientosRoute).then(data => this.setState({financiamientos:data,controlFin:true}))
        handleApi(pcuRoute).then(data => this.setState({pcu:data,controlPcu:true}))
        handleApi(inventarioRoute).then(data => this.setState({inventario:data,controlInv:true}))
    }

    render() {
        const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
            this.setState({value:newValue})
        }
        return(
            <div>
                <Tabs value={this.state.value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered>
                    <Tab label={"Subsidios y Financiamientos"}></Tab>
                    <Tab label={"Vivienda"}/>
                </Tabs>
                {(this.state.value === 0) ?
                    (this.state.controlSub)?
                    <CrossCharts data={this.state.subsidios} periodo={'del 31 de mayo de 2021'} seccion={'subsidios'} title={'Subsidios CONAVI'} titleCifras={'subsidios'}
                                 titlePie={'Modalidad'} titleRow={'Programa presupuestal'} group={'programa_presupuestal'}
                                 dimensionAxis={'modalidad'} groupAxis={'acciones'}/> : <></>
                    :
                    (this.state.controlInv)?
                        <AccionesCharts data={this.state.inventario} periodo={'desde 2014 hasta el 2021'} seccion={'inventario'}  title={'Inventario de Vivienda'} titleCifras={'viviendas vigentes'}
                                    titlePie={'Segmento'} titleRow={'Avance de obra'} group={'avance_obra'} dimensionAxis={'segmento'}
                                    groupAxis={'viviendas'} /> :<></>
                }
                {(this.state.value === 0) ?
                    (this.state.controlFin)?
                        <CrossCharts data={this.state.financiamientos} periodo={'del 31 de mayo de 2021'} seccion={'financiamientos'} title={'Financiamientos'}
                                 titleCifras={'financiamientos'} titlePie={'Modalidad'} titleRow={'Organismo'}
                                 group={'organismo'} dimensionAxis={'modalidad'} groupAxis={'acciones'}/> : <></>
                    :
                    (this.state.controlPcu)?
                    <AccionesCharts data={this.state.pcu} periodo={'del 30 de abril de 2021'} seccion={'registro'}  title={'Registro de Vivienda'} titleCifras={'viviendas registradas'}
                                    titlePie={'PCU'} titleRow={'Segmento VSM'} group={'segmento'} dimensionAxis={'pcu'} groupAxis={'viviendas'} />: <></>
                }
                <br/><br/><br/>
            </div>
        )
    }
}