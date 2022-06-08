import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { AdminAxios } from '../../../axios'

function Industry() {
    const [Categories, setCategories] = useState([])
    const [NewCat, setNewCat] = useState('')
    const [adding, setadding] = useState(false)
    const [editIndex, setEditIndex] = useState();
    const [edit_cat, setedit_cat] = useState('');
    const [editId, seteditId] = useState('')
    useEffect(() => {
        axios.get('/api/industry').then((res) => {
            setCategories(res.data)
        })
    }, [])

    const HandleAdd = (e) => {
        e.preventDefault();
        setadding(true);
        AdminAxios.post('/industry/store', { name: NewCat }).then((res) => {
            console.log(res.data)
            setCategories([...Categories, res.data.data]);
            setadding(false)
            setNewCat('');
            toast.success('🦄' + "Item Added", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch((error) => {
            if (error.response && error.response.status == 422) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    if (Object.hasOwnProperty.call(errors, key)) {
                        const element = errors[key][0];
                        console.log(element);
                        toast.error('🦄' + element, {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            }
        })
    }

    const HandleDelete = (e, itemId) => {
        e.preventDefault()
        AdminAxios.delete(`/industry/delete/${itemId}`).then(res => {
            if (res.status == 200) {
                toast.error('🦄' + res.data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const items = Categories.filter((cat) => {
                    return cat.id !== itemId;
                })
                setCategories(items);
            }
        })
    }

    const ShowEditForm = (e, i) => {
        e.preventDefault()
        setEditIndex(i);
        setedit_cat(Categories[i].name);
    }

    const handleUpdate = (id, name) => {
        setedit_cat(name);
        seteditId(id);
    }
    const sendUpdateRequest = (e) =>{
        e.preventDefault()
        AdminAxios.put(`industry/update/${editId}`,{name: edit_cat}).then(res=>{
            if (res.status == 200) {
                toast.info('🦄' + "Updated", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            console.log(res);
            setCategories(res.data);
            setEditIndex(null);
        }
        })
    }
    return (
        <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Service related dropdowns</h4>
                    <div className="row">
                        <div className="col-lg-6">
                            <h5>Service Industry Type</h5><hr />
                            <div className="grid-margin">
                                {Categories.map((c, i) => {
                                    return (<div key={i} className="d-flex my-2">
                                        {(editIndex === i) ?
                                            <Form.Group className="row">
                                                <div className="col-sm-9">
                                                    <Form.Control type="text" onChange={(e) => handleUpdate(c.id, e.target.value)} value={edit_cat} />
                                                </div>
                                                <div className="col-sm-3">
                                                    <button className="btn btn-outline-secondary btn-lg" onClick={e => sendUpdateRequest(e)}>Update</button>
                                                </div>
                                            </Form.Group>
                                            : <>
                                                <span className="flex-sm-fill">{c.name}</span>
                                                <button className="btn btn-icons btn-outline-danger mx-2" onClick={e => HandleDelete(e, c.id)}>
                                                    <span className="mdi mdi-delete-forever"></span>
                                                </button>
                                                <button className="btn btn-icons btn-outline-success mx-2" onClick={(e) => ShowEditForm(e, i)}>
                                                    <span className="mdi mdi-lead-pencil"></span>
                                                </button>
                                            </>
                                        }
                                    </div>)
                                })}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h5>Add new Categories</h5><hr />
                            <form>
                            <Form.Group className="row">
                                <div className="col-sm-9">
                                    <Form.Control type="text" onChange={(e) => setNewCat(e.target.value)} value={NewCat} />
                                </div>
                                <div className="col-sm-3">
                                    <button type="submit" className="btn btn-outline-primary btn-lg" onClick={e => HandleAdd(e)}>{adding ? "Adding..." : "Add"}</button>
                                </div>
                            </Form.Group>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Industry
