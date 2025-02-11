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
                <i className="bi bi-person"></i>
              </div>
            </div>
            <div className="card-footer p-2 ps-3">
              <p className="mb-0 text-sm">than last week</p>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default DashBox