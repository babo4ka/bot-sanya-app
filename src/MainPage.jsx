import { useEffect, useState } from "react"
import tariffs from "./tariffs.json"
import { useTg } from "./utils"
import TariffsShowing from "./TariffsShowing"

const TariffsChoosing = ({chooseTariffsGroup}) =>{

    const {tg} = useTg()

    const chooseTariffBtnText = "получить консультацию по всем тарифам"

    const warning = `после нажания на кнопку "${chooseTariffBtnText.toString().toUpperCase()}" приложение закроется и Александр получит ссылку для связи с тобой`


    const allTariffs = ()=>{
        tg.sendData(`/consult all app`)
        tg.close()
    }

    useEffect(()=>{

    }, [tg])

    return(
        <div className="col-12 row justify-content-center tariffs-group-choose margin-left-0">
                <button onClick={()=>chooseTariffsGroup("net-n-tv-mob", 2)} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет + ТВ + Мобильная связь</button>


                <button onClick={()=>chooseTariffsGroup("net", 3)} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет</button>


                <button onClick={()=>chooseTariffsGroup("net-n-tv", 4)} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет + ТВ</button>


                <span className="mt-5 text-center fw-bold">или можешь запросить консультацию по всем тарифам, кажав на кнопку ниже</span>
                <span className="mt-5 text-center fw-bold warning-txt">{warning}</span>
   
                <button onClick={allTariffs} className="btn btn-primary col-12 tariff-group-btn rost-btn">получить консультацию по всем тарифам</button>
        </div>
    )
}

const MainPage = () =>{

    const {tg, user}= useTg()

    useEffect(()=>{
        tg.ready()
    }, [tg])

    const [tariffsGroup, setTariffsGroup] = useState(undefined)

    const chooseTariffsGroup = (group, num)=>{
        setTariffsGroup(<TariffsShowing tariffs={tariffs[group]} group={num} goBack={goBack}/>)
    }

    const goBack = ()=>{
        setTariffsGroup(undefined)
    }

    const choosing = <TariffsChoosing chooseTariffsGroup={chooseTariffsGroup}/>
    
    return(
        <div className="container-fluid main">
            <h4 className="text-center">Привет, {user?user.first_name:" безымянный"}</h4>
            <h6 className="text-center">Ниже ты можешь ознакомиться с нашими тарифами и выбрать интересующий, я сообщу Александру и он свяжется с тобой</h6>


            {tariffsGroup ?? choosing}
        </div>
    )
}

export default MainPage