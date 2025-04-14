
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButtons = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/profile" className="w-full">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/orders" className="w-full">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/wishlist" className="w-full">Wishlist</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/sign-in">
      <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
        <User className="h-4 w-4" />
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButtons;
