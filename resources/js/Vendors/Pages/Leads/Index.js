import React, { useEffect, useRef, useState } from 'react'
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { venodrAxios } from '../../../axios';
import { toast } from 'react-toastify';

function Index() {
    const [Leads, setLeads] = useState([])

    useEffect(() => {
        venodrAxios.get('/leads').then((res) => {
            console.log(res);
            setLeads(res.data)
        })
    }, [])

    const gridRef = useRef(null);

    const gridOptions = {
        pagination: true,
        rowSelection: "single",
        isScrollLag: () => false,
    };

    const deleteItem = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if (selectedData.length == 0) {
            alert("Select item first")
        } else {
            selectedData.map((data) => {
                venodrAxios.delete(`/leads/delete/${data.id}`).then(res => {
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
                        setLeads(res.data.data)
                    }
                })
            })
        }
    }

    const Call = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if (selectedData.length == 0) {
            return alert("Select item first")
        }
        else if(selectedData.length > 1){
            return alert("can't call multiple recipent at once")
        } else {
            return location.href = "tel:"+selectedData.phone
        }
    }


    const Mail = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if (selectedData.length == 0) {
            return alert("Select item first")
        }
        else if(selectedData.length > 1){
            return alert("can't send multiple mail at once")
        } else {
            return location.href = "mailto:"+selectedData.email
        }
    }





    return (
        <div className="row">

            <div className="col-12 grid-margin">
                <div className="ag-theme-alpine" style={{ height: 600 }}>

                    <button className="btn btn-danger my-2 mx-2" onClick={deleteItem}>
                    <i className="mdi mdi-delete-forever"></i> Delete</button>
                    <button className="btn btn-success my-2 mx-2" onClick={Call}><i className="mdi mdi-call-made"></i> Call</button>
                    <button className="btn btn-danger my-2" onClick={Mail}> <i className="mdi mdi-contact-mail"></i> Mail</button>
                    <AgGridReact
                        gridOptions={gridOptions}
                        ref={gridRef}
                        rowData={Leads}
                        rowSelection="multiple"
                        pagination={true}
                        animateRows={true}
                    >
                        <AgGridColumn field="id" initialHide={true}  ></AgGridColumn>
                        <AgGridColumn
                        checkboxSelection={true}
                            field="software.software_name"
                            sortable={true}
                            filter={true}
                            headerName="Software Name"
                            resizable={true}
                        ></AgGridColumn>

                        <AgGridColumn
                            field="name"
                            sortable={true}
                            filter={true}

                            headerName="Name"
                            resizable={true}
                        ></AgGridColumn>


                        <AgGridColumn
                            field="email"
                            sortable={true}
                            filter={true}
                            headerName="Email"
                        ></AgGridColumn>

                        <AgGridColumn
                            field="phone"
                            sortable={true}
                            filter={true}
                            headerName="Phone"
                        ></AgGridColumn>

                        <AgGridColumn
                            field="created_at"
                            sortable={true}
                            filter={true}
                            headerName="Added On"
                        ></AgGridColumn>

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}

export default Index
