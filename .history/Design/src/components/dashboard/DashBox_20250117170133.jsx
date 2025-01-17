import React from 'react'

const DashBox = ({title,total_number}) => {
  return (
    <>
         
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-2 ps-3">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-sm mb-0 text-capitalize">{title}</p>
                  <h4 className="mb-0">{total_number}</h4>
                </div>
                <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                  <i className="material-symbols-rounded opacity-10">weekend</i>
                </div>
              </div>
            </div>
            <div className="card-footer p-2 ps-3">
              <p className="mb-0 text-sm"><span className="text-success font-weight-bolder">+55% </span>than last week</p>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default DashBox
