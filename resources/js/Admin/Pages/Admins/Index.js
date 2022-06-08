import React, { useEffect, useRef, useState } from 'react'
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { AdminAxios } from '../../../axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Index() {
    const [Admins, setAdmins] = useState([])

    useEffect(() => {
        AdminAxios.get('/all-admins').then((res) => {
            console.log(res);
            setAdmins(res.data)
        })
    }, [])

    const gridRef = useRef(null);

    const gridOptions = {
        pagination: true,
        rowSelection: "single",
        isScrollLag: () => false,
    };

    const deleteItem = (id) => {

                AdminAxios.delete(`/admins/delete/${id}`).then(res => {
                    if (res.status == 200) {
                        toast.success('🦄' + res.data.message, {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setAdmins(res.data)
                    }
                })

        }








    const HandleStatus = (id) =>{
        if(id){
            AdminAxios.put(`/status/${id}`).then((res)=>{
                if(res.status===200){
                    setAdmins(res.data)
                }
            })
        }
    }



    return (
        <div className="row">

            <div className="col-12 grid-margin">
                <div className="ag-theme-alpine" style={{ height: 600 }}>


                    <Link className="btn btn-success my-2 mx-2" to="/appAdmin/create-admins"><i className="mdi mdi-call-made"></i> Add Admins</Link>

                    {/* <button className="btn btn-danger my-2" onClick={Mail}> <i className="mdi mdi-contact-mail"></i> Mail</button> */}
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                            <th>SN.</th>
                                <th colSpan="3">Name</th>
                                <th colSpan="5">Email</th>
                                <th colSpan="5">Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Admins.map((admin, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td colSpan="3">{admin.name}</td>
                                        <td colSpan="5">{admin.email}</td>
                                        <td colSpan="5">
                                            {admin.status=="1"?
                                        <button className="btn btn-success" onClick={()=>HandleStatus(admin.id)}>Active</button>:
                                        <button className="btn btn-danger" onClick={()=>HandleStatus(admin.id)}>Unactive</button>
                                        }
                                        </td>
                                        <td>
                                        <button className="btn btn-danger my-2 mx-2" onClick={()=>deleteItem(admin.id)}>
                                            <i className="mdi mdi-delete-forever"></i></button>
                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Index
