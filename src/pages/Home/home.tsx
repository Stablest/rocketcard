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
    useEffect(() => updateUser,[])
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
        console.log(user)
        setUser(user)
    }
}

function Card(props:any){
    return(
        <div className='container'>
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
                            {props.user.followers}
                            Seguidores
                        </li>
                        <li className='listItem'>
                            <img src="assets/following.svg" alt="" />
                            <span>{props.user.following} </span>
                            <span>Seguindo</span>
                        </li>
                        <li className='listItem'>
                            <img src="assets/repository.svg" alt="" />
                            {props.user.public_repos}
                            Repositórios
                        </li>
                        <li className='listItem'>
                            <img src="assets/company.svg" alt="" />
                            {props.user.company ? props.user.company : 'Nenhuma'}
                        </li>
                        <li className='listItem'>
                            <img src="assets/location.svg" alt="" />
                            {props.user.location ? props.user.location : 'Nenhuma'}
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

function CustomCard(){
    return(
        <div className='customCard'>
            <span>Customizar Rocketcard</span>
            <button className='getBackground'>Gerar background</button>
        </div>
    )
}