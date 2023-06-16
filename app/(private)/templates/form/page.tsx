"use client"

import { ChangeEvent, FormEvent, useState } from "react"

const IndexPage: React.FC = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        // Email successfully sent
        alert("Email submitted successfully!")
      } else {
        // Handle error response
        alert("Failed to submit email. Please try again.")
      }
    } catch (error) {
      // Handle network or server errors
      alert("An error occurred. Please try again later.")
    }

    setEmail("")
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div>
      <h1>Collect Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default IndexPage
