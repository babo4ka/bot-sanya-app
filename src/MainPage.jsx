import { useEffect, useState } from "react";
import tariffs from "./tariffs.json"
import { useTg } from "./utils";

const TariffCard = ({tariffInfo}) =>{

    return(
        <div className="col-12 tariff-card row justify-content-center mt-3">
            <h3 className="col-12 text-center mb-5">{tariffInfo.name}</h3>
            <div className="col-12 tariff-element text-center wifi-block">
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

            <button className="btn btn-primary mt-3">Выбрать этот тариф</button>

        </div>
    )
}

const MainPage = () =>{

    const {tg, user}= useTg()

    useEffect(()=>{
        tg.ready()
    }, [tg])

    const tariffsArray = tariffs.tariffs;

    const [currentTariff, setCurrentTariff] = useState(0)

    const [hidden, setHidden] = useState(true)

    const next = () =>{
        if(currentTariff < tariffsArray.length-1)
            setCurrentTariff(prev => prev+1)
        
        if (currentTariff === tariffsArray.length-2){
            console.log(2)
            const anim = document.getElementById("btn-next").animate([
                {width:"0px"}
            ],{duration:500})

            document.getElementById("btn-back").animate([
                {width:"200px"}
            ],{duration:500})

            anim.onfinish = () =>{
                document.getElementById("btn-next").style.display = "none"
                document.getElementById("btn-back").style.width = "200px"
            }

            setHidden(true)
        }

        if(hidden){
            setHidden(false)
            document.getElementById("btn-back").style.display = "block"

            const anim = document.getElementById("btn-next").animate([
                {width:"100px"}
            ],{duration:500})

            document.getElementById("btn-back").animate([
                {width:"100px"}
            ],{duration:500})

            anim.onfinish = () =>{
                document.getElementById("btn-next").style.width = "100px"
                document.getElementById("btn-back").style.width = "100px"
            }
        }
    }

    const previous = () =>{
        if(currentTariff > 0)
            setCurrentTariff(prev => prev-1)
        
        if(currentTariff === 1){
            const anim = document.getElementById("btn-back").animate([
                {width:"0px"}
            ],{duration:500})

            document.getElementById("btn-next").animate([
                {width:"200px"}
            ],{duration:500})

            anim.onfinish = () =>{
                document.getElementById("btn-back").style.display = "none"
                document.getElementById("btn-back").style.width = "0px"
                document.getElementById("btn-next").style.width = "200px"
            }

            setHidden(true)
        }

        if(hidden){
            setHidden(false)
            document.getElementById("btn-next").style.display = "block"

            const anim = document.getElementById("btn-next").animate([
                {width:"100px"}
            ],{duration:500})

            document.getElementById("btn-back").animate([
                {width:"100px"}
            ],{duration:500})

            anim.onfinish = () =>{
                document.getElementById("btn-next").style.width = "100px"
                document.getElementById("btn-back").style.width = "100px"
            }
        }
    }
    
    return(
        <div className="container-fluid main">
            <h4 className="text-center">Привет, {user?user.first_name:" безымянный"}</h4>
            <h6 className="text-center">Ниже ты можешь ознакомиться с нашими тарифами и выбрать интересующий, я сообщу Александру и он свяжется с тобой</h6>
            <div className="row justify-content-center">
                <TariffCard tariffInfo={tariffsArray[currentTariff]}/>
            </div>

            <div className="col-12 row justify-content-center btns">
                <button id="btn-back" className="btn btn-primary nav-btn text-truncate" onClick={previous}>{"<---"}</button>
                <button id="btn-next" className="btn btn-primary nav-btn text-truncate" onClick={next}>{"--->"}</button>
            </div>
        </div>
    )
}

export default MainPage