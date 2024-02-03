import { useState } from "react"
import { useTg } from "./utils"
import $ from 'jquery'

const TariffCard = ({tariffInfo}) =>{
    
    const chooseTariffBtnText = "выбрать этот тариф"

    const warning = `после нажания на кнопку "${chooseTariffBtnText.toString().toUpperCase()}" приложение закроется и Александр получит ссылку для связи с тобой`

    
    const {tg} = useTg()

    const onChoose = () =>{
        tg.sendData(`/consult ${tariffInfo.number} app`)
        tg.close()
    }

    return(
        <div id="tariffs-card" className="col-12 tariff-card row justify-content-center mt-3">
            <h3 className="col-12 text-center mb-5">{tariffInfo.name}</h3>
            <div className="col-12 tariff-element text-center wifi-block mt-3">
                <span>Интернет: </span>
                <span>{tariffInfo.internet} Мбит/сек.</span>
            </div>
            
            {tariffInfo.tv?
                <div className="col-12 tariff-element text-center mt-3">
                    <span>ТВ: </span>
                    <span>{tariffInfo.tv} каналов</span>
                </div>
            :""}

            {tariffInfo.wink?
                <div className="col-12 tariff-element text-center mt-3">
                    <span>WINK: </span>
                    <span>{tariffInfo.wink}</span>
                </div>
            :""}

            {tariffInfo.mobile?
                <div className="col-12 tariff-element text-center mt-3">
                    <span>Мобильная связь: </span>
                    <span>{tariffInfo.mobile}</span>
                </div>
            :""}
           

           <div className="col-12 tariff-element text-center mt-3">
                <span>Роутер<br/></span>
                <span>{tariffInfo.router}</span>
            </div>

            {tariffInfo.pristavka?(
                <div className="col-12 tariff-element text-center mt-3">
                <span>ТВ Приставка<br/></span>
                <span>{tariffInfo.pristavka}</span>
            </div>
            ):""}

            <div className="col-12 tariff-element row justify-content-center text-center mt-3">
                <span>Цена<br/></span>
                {tariffInfo.disc?
                    <span className="col-12">{tariffInfo.disc}</span>
                :""}
                <span className="col-12">{tariffInfo.price}</span>
               
            </div>

            <div className="col-12 row justify-content-center text-center mt-5 warning-txt">
                <span className="col-12">{warning}</span>
            </div>
            <button onClick={onChoose} className="btn btn-primary mt-5 rost-btn">выбрать этот тариф</button>

        </div>
    )
}

const TariffsShowing = ({tariffs, goBack})=>{

    const [currentTariff, setCurrentTariff] = useState(0)

    const [hidden, setHidden] = useState(true)

    const next = () =>{
        if(currentTariff < tariffs.length-1){
            $("#tariffs-card").fadeOut('slow', ()=>{
                setCurrentTariff(prev => prev+1)
                $("#tariffs-card").fadeIn('slow')
            })
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
        if(currentTariff > 0){
            $("#tariffs-card").fadeOut('slow', ()=>{
                setCurrentTariff(prev => prev-1)
                $("#tariffs-card").fadeIn('slow')
            })
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
        <div className="container-fluid tariff-content margin-left-0">

            <div className="row justify-content-center">
                <span className="fw-bold text-center">
                    в этой категории {tariffs.length} {tariffs.length%10===1?"тариф":"тарифа"}
                </span>
            </div>
            

            <div className="row justify-content-center">
                <TariffCard tariffInfo={tariffs[currentTariff]}/>
            </div>

            <div className="col-12 row justify-content-center btns mt-5 margin-left-0">

                {tariffs.length >1?(
                    <div className="row justify-content-center margin-left-0">
                    <button id="btn-back" className="btn btn-primary nav-btn text-truncate rost-btn" onClick={previous}>{"<---"}</button>
                    <button id="btn-next" className="btn btn-primary nav-btn text-truncate rost-btn" onClick={next}>{"--->"}</button>
                </div>   
                ):""}
                             
                

                <button onClick={goBack} className="col-12 btn btn-primary mt-5 rost-btn">
                        назад к выбору тарифов
                </button>
            </div>
        </div>

    )
}

export default TariffsShowing