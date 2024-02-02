import { useEffect, useState } from "react";
import tariffs from "./tariffs.json"
import { useTg } from "./utils";
import TariffsShowing from "./TariffsShowing";

const TariffsChoosing = ({chooseTariffsGroup}) =>{


    return(
        <div className="col-12 row justify-content-center tariffs-group-choose margin-left-0">
                <button onClick={()=>chooseTariffsGroup("net-n-tv-mob")} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет + ТВ + Мобильная связь</button>


                <button onClick={()=>chooseTariffsGroup("net")} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет</button>


                <button onClick={()=>chooseTariffsGroup("net-n-tv")} className="btn btn-primary col-12 tariff-group-btn rost-btn">Интернет + ТВ</button>

              
        </div>
    )
}

const MainPage = () =>{

    const {tg, user}= useTg()

    useEffect(()=>{
        tg.ready()
    }, [tg])

    const [tariffsGroup, setTariffsGroup] = useState(undefined)

    const chooseTariffsGroup = (group)=>{
        setTariffsGroup(<TariffsShowing tariffs={tariffs[group]} goBack={goBack}/>)
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