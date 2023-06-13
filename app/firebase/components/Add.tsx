import { addTodo } from "@/firebase/actions"

export default function AddTodo() {
  const content = (
    <form action={addTodo} className="flex items-center gap-2">
      <input
        type="text"
        name="display_name"
        className="w-full grow rounded-lg p-1 text-2xl"
        placeholder="New Todo"
      />

      <input
        type="text"
        name="username"
        className="w-full grow rounded-lg p-1 text-2xl"
        placeholder="Description"
      />

      <button
        type="submit"
        className="max-w-xs rounded-2xl border-2 border-solid border-black bg-green-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-green-400"
      >
        Submit
      </button>
    </form>
  )

  return content
}
