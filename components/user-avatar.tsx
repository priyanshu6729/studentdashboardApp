import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "firebase/auth"

interface UserAvatarProps {
  user: User | null
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?"

    // If it's an email, use first letter of the email
    if (name.includes("@")) {
      return name.split("@")[0][0].toUpperCase()
    }

    // Otherwise try to get initials from name
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Avatar className={className}>
      {user?.photoURL ? (
        <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.displayName || user.email || "User"} />
      ) : null}
      <AvatarFallback>{getInitials(user?.displayName || user?.email)}</AvatarFallback>
    </Avatar>
  )
}
