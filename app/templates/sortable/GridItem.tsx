import React from "react"

interface GridItemProps {
  user: {
    id: number
    name: string
  }
}

const GridItem: React.FC<GridItemProps> = ({ user }) => {
  return (
    <div className="card rounded-3 ratio-1/1 overflow-hidden bg-slate-400 shadow-sm">
      <div className="card-body ">
        <h3 className=" h5 card-title m-0">{user.name}</h3>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <span>{user.id}</span>
        <span className="btn btn-white dragHandle border shadow-sm">
          DRAG ME
        </span>
      </div>
    </div>
  )
}

export default GridItem
