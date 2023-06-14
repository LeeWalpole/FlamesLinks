import Image from "next/image"

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
    <div className="grid-items card rounded-3 dragHandle overflow-hidden shadow-sm">
      {imageURL && <Image height={100} width={100} src={imageURL} alt="User" />}
    </div>
  )
}

export default GridItem
