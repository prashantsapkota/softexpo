import React from 'react'
import { Link } from 'react-router-dom'
export default function HeroSection() {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <h1>Grow your business with SoftExpo</h1>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img">
                        <img src="/images/hero.png" className="img-fluid animated" alt="" />
                    </div>
                </div>
            </div>
        </section>

    )
}
