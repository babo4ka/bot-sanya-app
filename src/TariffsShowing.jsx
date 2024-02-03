import { useState } from "react"
import { useTg } from "./utils"
import $ from 'jquery'
import "./Cubes.css"

const Cube = ({side, name}) =>{


    return(
        <div className={`cube ${side}`}>
                    <div class={`back side ${name}`}></div>
                    <div class={`left side ${name}`}></div>
                    <div class={`right side ${name}`}></div>
                    <div class={`top side ${name}`}></div>
                    <div class={`bottom side ${name}`}></div>
                    <div class={`front side ${name}`}></div>
                </div>
    )
}

const TariffCard = ({tariffInfo}) =>{
    
    const chooseTariffBtnText = "выбрать этот тариф"

    const warning = `после нажания на кнопку "${chooseTariffBtnText.toString().toUpperCase()}" приложение закроется и Александр получит ссылку для связи с тобой`

    
    const {tg} = useTg()

    const onChoose = () =>{
        tg.sendData(`/consult ${tariffInfo.number} app`)
        tg.close()
    }

    const checkChannelsEnding = [2,3,4]

    return(
        <div id="tariffs-card" className="col-12 tariff-card row justify-content-center mt-3">
            <h3 className="col-12 text-center mb-5">{tariffInfo.name}</h3>
            <div className="col-12 tariff-element text-center wifi-block mt-3">

                <Cube name="wifi-logo" side="side-left"/>

                <span>ИНТЕРНЕТ</span><br/>
                <span>{tariffInfo.internet} Мбит/сек.</span>

                <Cube name="wifi-logo" side="side-right"/>
            </div>
            
            {tariffInfo.tv?
                <div className="col-12 tariff-element text-center mt-3">
                    <Cube name="tv-logo" side="side-left"/>

                    <span>ТВ</span><br/>
                    <span>{tariffInfo.tv} {checkChannelsEnding.some(e => e === tariffInfo.tv%10)?"канала":"каналов"}</span>

                    <Cube name="tv-logo" side="side-right"/>
                </div>
            :""}

            {tariffInfo.wink?
                <div className="col-12 tariff-element text-center mt-3">
                    <Cube name="wink-logo" side="side-left"/>

                    <span>WINK</span><br/>
                    <span>{tariffInfo.wink}</span>
                
                    <Cube name="wink-logo" side="side-right"/>
                </div>
            :""}

            {tariffInfo.mobile?
                <div className="col-12 tariff-element text-center mt-3">
                    <Cube name="mobile-logo" side="side-left"/>

                    <span>МОБИЛЬНАЯ СВЯЗЬ</span><br/>
                    <span>{tariffInfo.mobile}</span>
                
                    <Cube name="mobile-logo" side="side-right"/>
                </div>
            :""}

            <div className="col-12 tariff-element row justify-content-center text-center mt-3">
                <Cube name="price-logo" side="side-left"/>

                <span>ЦЕНА<br/></span><br/>
                {tariffInfo.disc?
                    <span className="col-12">{tariffInfo.disc}</span>
                :""}
                <span className="col-12">{tariffInfo.price}</span>
               
                <Cube name="price-logo" side="side-right"/>
            </div>
           

           <div className="col-12 tariff-element text-center mt-5">
                <span>РОУТЕР<br/></span>
                <span>{tariffInfo.router}</span>
            </div>

            {tariffInfo.pristavka?(
                <div className="col-12 tariff-element text-center mt-3">
                <span>ТВ ПРИСТАВКА<br/></span>
                <span>{tariffInfo.pristavka}</span>
            </div>
            ):""}



            <div className="col-12 row justify-content-center text-center mt-5">
                <span className="col-12 warning-txt">{warning}</span>
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