import Vivienda from "./Oferta/Vivienda";
import React, {Component} from "react";
import {ofertaInventario} from "../json/ofertaInventario";
import {ofertaRegistro} from "../json/ofertaRegistro";
import {FormControl, InputLabel, MenuItem, Select, Tab, Tabs} from "@material-ui/core";
import RegistroVivienda from "./Oferta/RegistroVivienda";
import Fetch from "./Fetch";

const handleApi = async(route:any) => {
    return await Fetch(route);
}
const inventarioRoute = 'getKPIsOfertaInventario/'
const registroRoute = 'getKPIsOferta/'


export default class Oferta extends Component<any, any> {

    constructor(props:any) {
        super(props);
        this.state = {
            value:0,
            inventario:[],controlInv:false,
            registro:[],controlReg:false,
            inventarioRango0:2021,inventarioRango1:4,
            registroRango0:2021,registroRango1:2021,
        }
    }
    componentDidMount() {
        handleApi(inventarioRoute+this.state.inventarioRango0+'/'+this.state.inventarioRango1).then(data => this.setState({inventario:data,controlInv:true}))
        handleApi(registroRoute+this.state.registroRango0+'/'+this.state.registroRango1).then(data => this.setState({registro:data,controlReg:true}))
    }

    render() {
        const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
            this.setState({value:newValue})
        }

        const handleCallbackInventario = (childData:any) =>{
            this.setState({controlInv:false,inventarioRango0:childData[0],inventarioRango1:childData[1]})
            handleApi(inventarioRoute+childData[0]+'/'+childData[1]).then(data => this.setState({inventario:data,controlInv:true}))
        }

        const handleCallbackRegistro = (childData:any) =>{
            this.setState({controlReg:false,registroRango0:childData[0],registroRango1:childData[1]})
            handleApi(registroRoute+childData[0]+'/'+childData[1]).then(data => this.setState({registro:data,controlReg:true}))
        }

        return (
            <div>
                <Tabs value={this.state.value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered >
                    <Tab label={"Inventario de Vivienda"}/>
                    <Tab label={"Registro de Vivienda"}/>
                    <Tab label={"RENARET"}/>
                    <Tab label={"Días de Inventario"}/>
                    <Tab label={"Parque Habitacional"}/>
                </Tabs>


                {(this.state.value === 0)?
                    (this.state.controlInv)?
                            <Vivienda callBack={handleCallbackInventario} rangos={[this.state.inventarioRango0,this.state.inventarioRango1]} data={this.state.inventario} seccion={'ofertaInventario'} title={'Inventario de Vivienda'}
                                      titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'Avance de Obra'}
                                      titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'avance_obra'} cAxis={'viviendas'}
                                      dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'}/>
                        :<></>
                        :
                    (this.state.value === 1)?
                        (this.state.controlReg)?
                        <RegistroVivienda callBack={handleCallbackRegistro} rangos={[this.state.registroRango0,this.state.registroRango1]} data={this.state.registro} seccion={'ofertaRegistro'}  title={'Registro de Vivienda'}
                                          titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'PCU'}
                                          titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'pcu'} cAxis={'viviendas'}
                                          dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} />:<></>
                        :
                        <></>

                }
                <br/><br/><br/>
            </div>

        )
    }


}