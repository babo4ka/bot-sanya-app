import { useState } from "react"
import { useTg } from "./utils"

const TariffCard = ({tariffInfo}) =>{
    
    const {tg} = useTg()

    const onChoose = () =>{
        tg.sendData(`/consult ${tariffInfo.number} app`)
        tg.close()
    }

    return(
        <div className="col-12 tariff-card row justify-content-center mt-3 tariffs-container">
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

            <button onClick={onChoose} className="btn btn-primary mt-5 rost-btn">Выбрать этот тариф</button>

        </div>
    )
}

const TariffsShowing = ({tariffs, goBack})=>{

    const [currentTariff, setCurrentTariff] = useState(0)

    const [hidden, setHidden] = useState(true)

    const next = () =>{
        if(currentTariff < tariffs.length-1)
            setCurrentTariff(prev => prev+1)

        
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
        
        if (currentTariff === tariffs.length-2){
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


    }

    const previous = () =>{
        if(currentTariff > 0)
            setCurrentTariff(prev => prev-1)

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

    }

    return(
        <div className="container-fluid">

            <div className="row justify-content-center">
                <TariffCard tariffInfo={tariffs[currentTariff]}/>
            </div>

            <div className="col-12 row justify-content-center btns mt-5">
                <button id="btn-back" className="btn btn-primary nav-btn text-truncate rost-btn" onClick={previous}>{"<---"}</button>
                <button id="btn-next" className="btn btn-primary nav-btn text-truncate rost-btn" onClick={next}>{"--->"}</button>

                <button onClick={goBack} className="col-12 btn btn-primary mt-5 rost-btn">
                        назад к выбору тарифов
                </button>
            </div>
        </div>

    )
}

export default TariffsShowing