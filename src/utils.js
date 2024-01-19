const tg = window.Telegram.WebApp

export const useTg = () =>{

    return{
        tg,
        user:tg.initDataUnsafe?.user
    }
}