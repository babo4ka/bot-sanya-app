import { useEffect, useState } from "react"
import { useTg } from "./utils"
import $ from 'jquery'
import "./Cubes.css"

const Cube = ({side, name, elementId, cubeName}) =>{

    useEffect(()=>{
        var height = parseFloat($(`#${elementId}`).css('height'))
        $(`.${cubeName}`).css('top', `${height/4}px`)
    })

    return(
        <div className={`cube ${side} ${cubeName}`}>
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
            <div id="tariff-element-wifi" className="col-12 tariff-element text-center wifi-block mt-3">

                <Cube cubeName="wifi-cube" elementId="tariff-element-wifi" name="wifi-logo" side="side-left"/>

                <span>ИНТЕРНЕТ</span><br/>
                <span>{tariffInfo.internet} Мбит/сек.</span>

                <Cube cubeName="wifi-cube" elementId="tariff-element-wifi" name="wifi-logo" side="side-right"/>
            </div>
            
            {tariffInfo.tv?
                <div id="tariff-element-tv" className="col-12 tariff-element text-center mt-3">
                    <Cube cubeName="tv-cube" elementId="tariff-element-tv" name="tv-logo" side="side-left"/>

                    <span>ТВ</span><br/>
                    <span>{tariffInfo.tv} {checkChannelsEnding.some(e => e === tariffInfo.tv%10)?"канала":"каналов"}</span>

                    <Cube cubeName="tv-cube" elementId="tariff-element-tv" name="tv-logo" side="side-right"/>
                </div>
            :""}

            {tariffInfo.wink?
                <div id="tariff-element-wink" className="col-12 tariff-element text-center mt-3">
                    <Cube cubeName="wink-cube" elementId="tariff-element-wink" name="wink-logo" side="side-left"/>

                    <span>WINK</span><br/>
                    <span>{tariffInfo.wink}</span>
                
                    <Cube cubeName="wink-cube" elementId="tariff-element-wink" name="wink-logo" side="side-right"/>
                </div>
            :""}

            {tariffInfo.mobile?
                <div id="tariff-element-mobile" className="col-12 tariff-element text-center mt-3">
                    <Cube cubeName="mobile-cube" elementId="tariff-element-mobile" name="mobile-logo" side="side-left"/>

                    <span>МОБИЛЬНАЯ СВЯЗЬ</span><br/>
                    <span>{tariffInfo.mobile}</span>
                
                    <Cube  cubeName="mobile-cube"elementId="tariff-element-mobile" name="mobile-logo" side="side-right"/>
                </div>
            :""}

            <div id="tariff-element-price" className="col-12 tariff-element row justify-content-center text-center mt-3">
                <Cube cubeName="price-cube" elementId="tariff-element-price" name="price-logo" side="side-left"/>

                <span>ЦЕНА<br/></span><br/>
                {tariffInfo.disc?
                    <span className="col-12">{tariffInfo.disc}</span>
                :""}
                <span className="col-12">{tariffInfo.price}</span>
               
                <Cube cubeName="price-cube" elementId="tariff-element-price" name="price-logo" side="side-right"/>
            </div>
           

           <div id="tariff-element-router" className="col-12 tariff-element text-center mt-5">
                <span>РОУТЕР<br/></span>
                {tariffInfo.router instanceof Array?tariffInfo.router.map(r => (
                    <span>{r}<br/></span>
                )):(
                    <span>{tariffInfo.router}</span>
                )}
                
            </div>

            {tariffInfo.pristavka?(
                <div id="tariff-element-pristavka" className="col-12 tariff-element text-center mt-3">
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

const TariffsShowing = ({tariffs, goBack, group})=>{

    const [currentTariff, setCurrentTariff] = useState(0)

    const [hidden, setHidden] = useState(true)

    const {user, tg} = useTg()

    useEffect(()=>{
        tg.ready()

        if(user){
            $.get(`http://localhost:8080/update?uid=${user.id}&group=${group}`)
        }
        
    }, [tg, group, user])
    

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