import React from 'react'
import './styles.css'
import { useState } from 'react'
import { useEffect } from 'react'


type User = {
    login : string,
    followers : number,
    following : number,
    public_repos : number,
    company : null,
    location : string,
}

const URL = 'https://api.github.com/users/stablest'

export default function Home(){
    const [userNow,setUser] = useState({} as User)

    useEffect(() => {updateUser()},[])

    async function updateUser():Promise<void>{
        const res = await fetch(URL)
        const data = await res.json()
        const user:User = {
            login : data.login,
            followers : data.followers,
            following : data.following,
            public_repos : data.public_repos,
            company : data.company,
            location : data.location,
        }
        setUser(user)
    }


    return(
        <main>
            <div className='flex mainDiv'>
                <div className='firstElement'>
                    <span>Compartilhe seu #rocketcard</span>
                    <Card user={userNow}></Card>
                </div>
                <CustomCard></CustomCard>
            </div>
        </main>
    )

}

function Card(props:any){
    return(
        <div className='Card' id='container'>
            <div className='mini-container'>        
                <div className='mini-header'>
                    <div className='elipse'>
                        <img src="assets/logo.svg" alt="" className='first-logo'/>
                    </div>
                    <span>{props.user.login}</span>
                </div>
                <div className='circle mainAvatar'>
                    <img src="https://avatars.githubusercontent.com/u/45415868?v=4" alt="aa" className='main-img' />
                </div>
                <div className='divList'>
                    <ul className='boxList'>
                        <li className='listItem'>
                            <img src="assets/followers.svg" alt="" />
                            <span>{props.user.followers}</span>
                            <span>Seguidores</span>
                        </li>
                        <li className='listItem'>
                            <img src="assets/following.svg" alt="" />
                            <span>{props.user.following} </span>
                            <span>Seguindo</span>
                        </li>
                        <li className='listItem'>
                            <img src="assets/repository.svg" alt="" />
                            <span>{props.user.public_repos}</span>
                            <span>Repositórios</span>
                        </li>
                        <li className='listItem'>
                        <img src="assets/company.svg" alt="" />
                            {props.user.company ? <span> props.user.company</span> : 'Nenhuma'}
                        </li>
                        <li className='listItem'>
                            <img src="assets/location.svg" alt="" />
                            {props.user.location ? <span> props.user.location</span> : 'Nenhuma'}
                        </li>
                    </ul>
                </div>
                <div className='last-logo'>
                    <img src="assets/logo.svg" alt="" />
                    <span>ROCKETCARD</span>
                </div>
            </div>
        </div>
    )
}
function CustomCard(props:any){
    return(
        <div className='customCard'>
            <span>Customizar Rocketcard</span>
            <button className='getBackground' onClick={changeBackground}>Gerar background</button>
        </div>
    )

    function changeBackground() {
        const container = document.getElementById('container')
        let rgb:number[] = []
        for(let i:number=0; i<=2 ; i++)
            rgb[i] = (Math.random()*999)%255
        if(container)
            container.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    }
}