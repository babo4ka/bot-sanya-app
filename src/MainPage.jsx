import { useEffect, useState } from "react";
import tariffs from "./tariffs.json"
import { useTg } from "./utils";

const TariffCard = ({tariffInfo}) =>{

    return(
        <div className="col-12 tariff-card row justify-content-center">
            <h3 className="col-12 text-center">{tariffInfo.name}</h3>
            <div className="col-12 tariff-element text-center">
                <span>Интернет: </span>
                <span>{tariffInfo.internet} Мбит/сек.</span>
            </div>
            
            {tariffInfo.tv?
                <div className="col-12 tariff-element text-center">
                    <span>ТВ: </span>
                    <span>{tariffInfo.tv} каналов</span>
                </div>
            :""}

            {tariffInfo.wink?
                <div className="col-12 tariff-element text-center">
                    <span>WINK: </span>
                    <span>{tariffInfo.wink}</span>
                </div>
            :""}

            {tariffInfo.mobile?
                <div className="col-12 tariff-element text-center">
                    <span>Мобильная связь: </span>
                    <span>{tariffInfo.mobile}</span>
                </div>
            :""}
           

           <div className="col-12 tariff-element text-center">
                <span>Оборудование (аренда): </span>
                <span>{tariffInfo.rent}</span>
            </div>

            <div className="col-12 tariff-element row justify-content-center text-center">
                {/* <span>Цена: </span> */}
                <span className="col-12">{tariffInfo.price}</span>
                {tariffInfo.price2?
                    <span className="col-12">{tariffInfo.price2}</span>
                :""}
            </div>

        </div>
    )
}

const MainPage = () =>{

    const {tg, user}= useTg()

    useEffect(()=>{
        tg.ready()
    }, [])

    const tariffsArray = tariffs.tariffs;

    const [currentTariff, setCurrentTariff] = useState(0)

    const next = () =>{
        if(currentTariff < tariffsArray.length-1)
            setCurrentTariff(prev => prev+1)
    }

    const previous = () =>{
        if(currentTariff > 0)
            setCurrentTariff(prev => prev-1)
    }
    
    return(
        <div className="container-fluid main">
            <h4>{user?.first_name}</h4>
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