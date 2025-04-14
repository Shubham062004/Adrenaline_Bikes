import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { User, Shield, Key, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) {
    navigate('/sign-in');
    return null;
  }
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => {
        // Fix: Ensure we're dealing with an object before spreading
        const parentObj = prev[parent as keyof typeof prev];
        if (typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Avatar className="h-20 w-20 mr-6">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" />
              <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name || 'User'}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information and address details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={profile.name} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={profile.email} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={profile.phone} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="text-lg font-medium mb-4">Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input 
                              id="street" 
                              name="address.street" 
                              value={profile.address.street} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Street address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="address.city" 
                              value={profile.address.city} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input 
                              id="state" 
                              name="address.state" 
                              value={profile.address.state} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="State or province"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP/Postal Code</Label>
                            <Input 
                              id="zip" 
                              name="address.zip" 
                              value={profile.address.zip} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="ZIP or postal code"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country" 
                              name="address.country" 
                              value={profile.address.country} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4 space-x-4">
                        {isEditing ? (
                          <>
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                              Save Changes
                            </Button>
                          </>
                        ) : (
                          <Button type="button" onClick={() => setIsEditing(true)}>
                            Edit Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and connected services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email updates about your orders and account</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Account Deletion</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-muted-foreground">Change your password or set up a stronger one</p>
                      </div>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline">Set Up</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
