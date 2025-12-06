import { Link } from '@tanstack/react-router'
import { MessageCircle } from 'lucide-react'

export const AuthHeader = () => {
  return (
    <header className="border-b-4 border-black bg-[#FFFAF0] p-4">
      <div className=" mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          <h1 className="text-2xl font-black">TOR Monitor</h1>
        </Link>
      </div>
    </header>
  )
}
