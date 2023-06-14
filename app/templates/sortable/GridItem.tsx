import React from "react"

interface GridItemProps {
  user: {
    id: number
    name: string
    imageURL?: string
  }
  imageURL?: string // Add the imageURL property to the GridItemProps interface
}

const GridItem: React.FC<GridItemProps> = ({ user, imageURL }) => {
  return (
    <div className="grid-items card rounded-3 overflow-hidden shadow-sm">
      <div className="card-body">
        <h3 className="h5 card-title m-0">{user.name}</h3>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <span>{user.id}</span>
        <span className="btn btn-white dragHandle border shadow-sm">
          DRAG ME
        </span>
      </div>
      {imageURL && <img src={imageURL} alt="User" />}
    </div>
  )
}

export default GridItem
