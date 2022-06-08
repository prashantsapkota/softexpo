import axios from 'axios'
import React, { useEffect, useState } from 'react'
import About from '../components/About'
import HeroSection from '../components/HeroSection'
import ProductListing from '../Product/ProductListing'
import Explore from './Explore'

export default function Home() {
    const [Categories, setCategories] = useState([])
    const [CurrentSoft, setCurrentSoft] = useState([])
    const [ActiveCat, setAtiveCat] = useState(0);
    const Softwares = [];
    useEffect(() => {
        const getCats = async() => {
        await axios.get('/api/software-categories').then((res)=>{
            setCategories(res.data)
            axios.get(`/api/softwares/filters?category_id=${res.data[ActiveCat].id}`).then((res)=>{
                Softwares[ActiveCat] = res.data;
                setCurrentSoft(res.data)
            })
        });
        }
        getCats()

    }, [])

    const HandleClickCat = (key) =>{
        setAtiveCat(key)
    }


    useEffect(() => {
        if (Categories.length > 0 && Softwares[ActiveCat]==null) {
            axios.get(`/api/softwares/filters?category_id=${Categories[ActiveCat].id}`).then((res)=>{
                Softwares[ActiveCat] = res.data;
                setCurrentSoft(res.data)
           })
        }else{
            setCurrentSoft(Softwares[ActiveCat])
        }
    }, [ActiveCat])

    return (
        <>

        <HeroSection />
       <main id="main">
            <About />
            <section id="products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="categories_header">
                                <h2>Discover Top Software By Categories</h2><hr/>
                            </div>
                            <div className="categories_lists d-flex flex-column">

                                    { Categories.map((v,k)=>{

                                        return (<button key={k} className={(ActiveCat==k) ? "btn py-2 my-1 text-sm-left btn-outline-danger" : "py-2 my-1 btn text-sm-left"} onClick={()=>HandleClickCat(k)} disabled={(ActiveCat==k) && true}>{v.name}</button>)

                                    })}

                            </div>
                        </div>
                        <div className="col-md-8">
                                    <div className="row">

                                        { CurrentSoft && (CurrentSoft.length > 0) ? CurrentSoft.map((v,k)=>{
                                            return <ProductListing key={k} Softwares={v} />
                                        }):"No Softwares found"}
                                    </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}
