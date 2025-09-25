import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  BarChart3, 
  BookOpen, 
  Sprout,
  Users,
  TrendingUp,
  Shield
} from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const features = [
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Get instant answers to your farming questions with voice support",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Track your farm's progress with personalized insights and analytics",
    color: "text-primary"
  },
  {
    icon: BookOpen,
    title: "Activity Tracking",
    description: "Log and monitor all your farming activities in one place",
    color: "text-success"
  },
  {
    icon: Sprout,
    title: "Advisory Services",
    description: "Receive personalized recommendations based on your crops and location",
    color: "text-warning"
  }
];

const stats = [
  { icon: Users, label: "Farmers Helped", value: "10,000+" },
  { icon: TrendingUp, label: "Crop Yield Increase", value: "25%" },
  { icon: Shield, label: "Success Rate", value: "95%" }
];

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Smart Farming
                  <span className="block text-primary">Made Simple</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Empower your farming journey with AI-driven insights, real-time monitoring, 
                  and personalized advice tailored for your crops.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all">
                  <Link to="/dashboard">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/chatbot">Try AI Assistant</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <stat.icon className="h-6 w-6 text-primary mx-auto" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <img
                src={heroImage}
                alt="Modern farming with technology"
                className="rounded-2xl shadow-strong w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need 
              to maximize your farming potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex p-3 rounded-xl bg-muted">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of farmers who are already using Krishi Sakhi to increase 
              their productivity and maximize their yields.
            </p>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-medium"
          >
            <Link to="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}