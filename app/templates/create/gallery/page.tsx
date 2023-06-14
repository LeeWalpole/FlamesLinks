import React from "react"

import GalleryForm from "./GalleryForm"

export default function CreateGallery() {
  return (
    <div>
      <h1 className="m-auto mb-4 w-96 text-2xl font-bold">Image Upload</h1>
      <section className="w-96">
        <GalleryForm />
      </section>
    </div>
  )
}
