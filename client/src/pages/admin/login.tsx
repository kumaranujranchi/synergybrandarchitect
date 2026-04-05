import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { LoginData } from "@shared/schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Login form schema with validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function AdminLogin() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  // Form definition
  const form = useForm<LoginData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login mutation
  const loginMutation = useMutation(api.auth.login);

  // Form submission handler
  async function onSubmit(values: LoginData) {
    console.log("LOGIN ATTEMPT STARTED", { email: values.email });
    setLoading(true);
    try {
      console.log("Calling loginMutation...");
      const user = await loginMutation({ 
        email: values.email, 
        password: values.password 
      });
      console.log("Mutation response:", user);
      
      if (user) {
        console.log("User valid. Setting localStorage...");
        // Store user info in localStorage (no real 'token' needed for simple Convex auth, but we keep the structure)
        localStorage.setItem("user", JSON.stringify(user));
        
        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name || 'Admin'}!`,
        });
        
        console.log("Redirecting to /admin/dashboard via Wouter...");
        // Redirect to dashboard using Wouter router instead of full page reload
        setLocation("/admin/dashboard");
      } else {
         console.warn("Mutation returned falsy user!");
      }
    } catch (error: any) {
      console.error("LOGIN FAILED:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log("LOGIN ATTEMPT FINISHED");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img 
            src="//i.imgur.com/8j3VafC.png" 
            alt="Synergy Brand Architect Logo" 
            className="h-16 mx-auto mb-2" 
          />
          <h1 className="text-xl font-bold">
            <span className="text-[#FF6B00]">Synergy</span>
            <span className="text-[#333333]">Brand Architect</span>
          </h1>
        </div>
        
        <Card className="w-full shadow-lg border-t-4 border-t-[#FF6B00]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#333333]">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          className="focus-visible:ring-[#FF6B00]"
                          {...field} 
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••" 
                          className="focus-visible:ring-[#FF6B00]"
                          {...field} 
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Contact administrator for access</p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-[#0066CC] hover:underline">← Return to website</a>
        </div>
      </div>
    </div>
  );
}