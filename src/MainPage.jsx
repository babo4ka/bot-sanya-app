import { useState } from "react";
import tariffs from "./tariffs.json"

const TariffCard = ({tariffInfo}) =>{

    return(
        <div className="col-12 tariff-card row justify-content-center">
            <h3 className="col-12 text-center">{tariffInfo.name}</h3>
            <div className="col-12">
                <span>Интернет: </span>
                <span>{tariffInfo.internet}</span>
            </div>
            
            {tariffInfo.tv?
                <div className="col-12">
                    <span>ТВ: </span>
                    <span>{tariffInfo.tv}</span>
                </div>
            :""}

            {tariffInfo.wink?
                <div className="col-12">
                    <span>WINK: </span>
                    <span>{tariffInfo.wink}</span>
                </div>
            :""}

            {tariffInfo.mobile?
                <div className="col-12">
                    <span>Мобильная связь: </span>
                    <span>{tariffInfo.mobile}</span>
                </div>
            :""}
           

           <div className="col-12">
                <span>Оборудование (аренда): </span>
                <span>{tariffInfo.rent}</span>
            </div>

            <div className="col-12">
                <span>Цена: </span>
                <span>{tariffInfo.price}</span>
            </div>

        </div>
    )
}

const MainPage = () =>{

    const tariffsArray = tariffs.tariffs;

    const [currentTariff, setCurrentTariff] = useState(0)

    const next = () =>{
        if(currentTariff < tariffsArray.length-2)
            setCurrentTariff(prev => prev+1)
    }

    const previous = () =>{
        if(currentTariff > 0)
            setCurrentTariff(prev => prev-1)
    }
    
    return(
        <div className="container-fluid main">
            <div className="row justify-content-center">
                <TariffCard tariffInfo={tariffsArray[currentTariff]}/>
            </div>

            <div className="col-12 row justify-content-center btns">
                <button className="btn btn-primary col-6 nav-btn" onClick={previous}>{"<---"}</button>
                <button className="btn btn-primary col-6 nav-btn" onClick={next}>{"--->"}</button>
            </div>
        </div>
    )
}

export default MainPage