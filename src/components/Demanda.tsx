import React, {Component} from "react";
import {Tab, Tabs} from "@material-ui/core";
import Subisidios from "./Demanda/Subisidios";
import Financiamientos from "./Demanda/Financiamientos";
import Fetch from "./Fetch";


const handleApi = async(route:any) => {
    return await Fetch(route);
}
const subsidiosRoute = 'getKPIsCONAVI2'
const financiamientosRoute = 'getKPIsFinanciamientos2'

export default class Demanda extends Component<any, any>{

    constructor(props:any) {
        super(props);
        this.state = {value:0,subsidios:[],financiamientos:[],controlSub:false,controlFin:false}
    }

    componentDidMount() {
        handleApi(subsidiosRoute).then(data => this.setState({subsidios:data,controlSub:true}))
        handleApi(financiamientosRoute).then(data => this.setState({financiamientos:data,controlFin:true}))
    }

    render() {
        const handleChange = (event: React.ChangeEvent<{}>,newValue:number) =>{
            this.setState({value:newValue})
        }

        return (
            <div>
                <Tabs value={this.state.value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered>
                    <Tab label={"Subsidios"}></Tab>
                    <Tab label={"Financiamientos"}/>
                </Tabs>
                {(this.state.value === 0)?
                    (this.state.controlSub)?<Subisidios data={this.state.subsidios} seccion={'ofertaInventario'} title={'Subsidios CONAVI'}
                                                     titleCifras={'subsidios'} titlePie={'Genero'} titlePie2={'Edad'}
                                                     titleRow1={'Programa presupuestal'} titleRow2={'Salario'} aAxis={'programa_presupuestal'}
                                                     bAxis={'monto'} cAxis={'acciones'} dAxis={'estado'} eAxis={'genero'} fAxis={'rango_edad'}
                                                     gAxis={'rango_salarial'}/>:<></>:
                    (this.state.controlFin)?<Financiamientos data={this.state.financiamientos} seccion={'ofertaInventario'} title={'Financiamientos'}
                                     titleCifras={'subsidios'} titlePie={'Genero'} titlePie2={'Edad'}
                                     titleRow1={'Programa presupuestal'} titleRow2={'Salario'} aAxis={'organismo'}
                                     bAxis={'monto'} cAxis={'acciones'} dAxis={'estado'} eAxis={'genero'} fAxis={'rango_edad'}
                                     gAxis={'rango_salarial'}/>:<></>
                }
                <br/><br/><br/>
            </div>

        )
    }


}