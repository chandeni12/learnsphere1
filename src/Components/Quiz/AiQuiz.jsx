import React from 'react'
import Navbar from '../Pages/Navbar'
import QuizStructure from './QuizStructure'
import Footer from '../Pages/Footer'
import Questions from './aiQues'

export default function AiQuiz() {
    let route = "/courses"
    return (
        <>
            <Navbar/>
            <QuizStructure Questions={Questions} path={route}/>
            <Footer/>
        </>
    )
}
