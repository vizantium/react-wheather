import search from '../assets/search.png'
import location from './../assets/location.png'
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {getWeather, setCity} from "../redux/search-slice";
import {StateType, useAppDispatch} from "../redux/redux-store";
import {useSelector} from "react-redux";

export const Header:React.FC = () => {
    const dispatch = useAppDispatch()
    const isMount = useRef(false)
    const city = useSelector((state:StateType) => state.searchSlice.city)
    const [typeTemp, setTypeTemp] = useState('')


    useEffect(  () => {
        if (isMount) {
            dispatch(getWeather({city: 'London'}))
            dispatch(setCity('London'))
        }
        isMount.current = true
    }, [])

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCity(event.target.value))
    }

    const getWeatherByName = (cityName: string) => {
        const city = cityName
        dispatch(getWeather({city, typeTemp}))
        dispatch(setCity(city))
    }

    useEffect( () => {

        dispatch(getWeather({city, typeTemp}))
    }, [typeTemp])

    const getWeatherByCity =  () => {
         dispatch(getWeather({city, typeTemp}))
    }
    return (
        <div>
            <div className={'buttons'}>
                <div onClick={() => getWeatherByName('Moscow')}>Moscow</div>
                <div onClick={() => getWeatherByName('London')}>London</div>
                <div onClick={() => getWeatherByName('Tokyo')}>Tokyo</div>
                <div onClick={() => getWeatherByName('Athens')}>Athens</div>
                <div onClick={() => getWeatherByName('Beijing')}>Beijing</div>
            </div>
            <div className={'search'}>
                <input onChange={onChangeInput} placeholder={'search for city...'}/>
                <div className={'icons'}  >
                    <img onClick={getWeatherByCity} className={'searchIcon'} src={search}/>
                    <img src={location}/>
                </div>
                <div className={'grade'}>
                    <span className={'transition'} onClick={() => setTypeTemp('metric')}>&#8451;</span>
                    <span>|</span>
                    <span className={'transition'} onClick={() => setTypeTemp('imperial')}>&#8457;</span>
                </div>
            </div>
        </div>
    )
}