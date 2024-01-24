import { useEffect, useState } from "react";
import tariffs from "./tariffs.json"
import { useTg } from "./utils";
import TariffsShowing from "./TariffsShowing";


const MainPage = () =>{

    const {tg, user}= useTg()

    useEffect(()=>{
        tg.ready()
    }, [tg])

    
    return(
        <div className="container-fluid main">
            <h4 className="text-center">Привет, {user?user.first_name:" безымянный"}</h4>
            <h6 className="text-center">Ниже ты можешь ознакомиться с нашими тарифами и выбрать интересующий, я сообщу Александру и он свяжется с тобой</h6>


            <div className="col-12 row justify-content-center tariffs-group-choose">
                <div className="col-12 row justify-content-center">
                    <button className="btn btn-primary col-3 tariff-group-btn">Интернет и ТВ</button>
                </div>

                <div className="col-12 row justify-content-center">
                    <button className="btn btn-primary col-3 tariff-group-btn">Интернет, ТВ и мобильаня связь</button>
                </div>

                <div className="col-12 row justify-content-center">
                    <button className="btn btn-primary col-3 tariff-group-btn">GPON для: Залесный, Аракчино, Лагерная, Адмиралтейская слобода, Красная горка, Юдино</button>
                </div>

                <div className="col-12 row justify-content-center">
                    <button className="btn btn-primary col-3 tariff-group-btn">GPON для ЖК "Беседа"</button>
                </div>
                
            </div>
        </div>
    )
}

export default MainPage