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
                <span>Оборудование: </span>
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
    console.log(tariffs)
    
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                {tariffs.tariffs.map(t =>(
                    <TariffCard tariffInfo={t} />
                ))}
            </div>
        </div>
    )
}

export default MainPage