import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import "/src/assets/css/test.css"
import Footer from './Footer'

export default function Test() {
    return (
        <>
            <Navbar />
            <div className='test mt-5'>
                <div className='text-center'>
                    <h3>Test Your knowledge</h3>
                    <p>Give the Quiz assessment to enhance your learning and development. </p>
                </div>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="list-group w-50 m-5">
                        <Link to="/test/java" className="list-group-item list-group-item-action">1. Java Programming Assessment</Link>
                        <Link to="/test/fullstack" className="list-group-item list-group-item-action">2. Full Stack Web Development</Link>
                        <Link to="/test/react" className="list-group-item list-group-item-action">3. React JS</Link>
                        <Link to="/test/javascript" className="list-group-item list-group-item-action">4. JavaScript</Link>
                        <Link to="/test/ai" className="list-group-item list-group-item-action">5. AI Quiz</Link>
                    </div>
                </div>
            </div>

            <Footer/>

        </>
    )
}
