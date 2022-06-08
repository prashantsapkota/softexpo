import React, { useEffect, useRef, useState } from "react";
import { venodrAxios } from "../../../axios";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";

function Softwares() {
    const [Software, setSoftware] = useState([]);
    const [Selected, setSelected] = useState([]);

    useEffect(() => {
        venodrAxios.get("/all-softwares").then((res) => {
            setSoftware(res.data);
        });
    }, []);
    const gridRef = useRef(null);


    // const onButtonClick = (e) => {
    //     const selectedDataStringPresentation = selectedData
    //         .map((node) => `${node.software_name} ${node.id}`)
    //         .join(", ");
    //     alert(`Selected nodes: ${selectedDataStringPresentation}`);
    // };

    const gridOptions = {
        pagination: true,
        rowSelection: "single",

        // // EVENTS
        // // Add event handlers
        // onRowClicked: event => console.log('A row was clicked'),
        // onColumnResized: event => console.log('A column was resized'),
        // onGridReady: event => console.log('The grid is now ready'),

        // // CALLBACKS
        isScrollLag: () => false,
    };

    const deleteItem = () =>{
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if(selectedData.length==0){
            alert("Select item first")
        }else{
            selectedData.map((data)=>{
                venodrAxios.delete(`/software/delete/${data.id}`).then(res=>{
                   if(res.status==200){
                    toast.success('🦄' + res.data.msg, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSoftware(res.data.data)
                   }
                })
            })
        }
    }

    return (
        <div className="row">
            <div className="col-12 grid-margin">
                <div className="ag-theme-alpine" style={{ height: 600 }}>
                    {/* <button onClick={onButtonClick}>Get selected rows</button> */}
                    <button className="btn btn-danger my-2" onClick={deleteItem}>Delete</button>
                    <AgGridReact
                        gridOptions={gridOptions}
                        ref={gridRef}
                        rowData={Software}
                        rowSelection="multiple"
                        pagination={true}
                    >
                        <AgGridColumn field="id" initialHide={true} ></AgGridColumn>
                        <AgGridColumn
                            field="software_name"
                            sortable={true}
                            filter={true}
                            checkboxSelection={true}
                            headerName="Software Name"
                            resizable={true}
                        ></AgGridColumn>

                        <AgGridColumn
                            field="tagline"
                            sortable={true}
                            filter={true}
                            headerName="Tagline"
                        ></AgGridColumn>

                        <AgGridColumn
                            field="software_logo"
                            sortable={true}
                            filter={true}
                            headerName="Logo"
                        ></AgGridColumn>

                        <AgGridColumn
                            field="summary"
                            sortable={true}
                            filter={true}
                            headerName="Summary"
                        ></AgGridColumn>

                        <AgGridColumn
                            field="description"
                            sortable={true}
                            filter={true}
                            headerName="Description"
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
    );
}

export default Softwares;
