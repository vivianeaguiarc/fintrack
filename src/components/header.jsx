import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { useAuthContext } from '@/context/auth'

import logo from '../assets/images/logo.svg'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        {/* ESQUERDA */}
        <img src={logo} alt="FinTrack Logo" className="h-8" />

        {/* DIREITA */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={signOut}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

export default Header
