import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Droplets, 
  ThermometerSun, 
  Wind,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MessageSquare,
  Sprout
} from "lucide-react";
import { Link } from "react-router-dom";

const weatherData = {
  current: {
    temp: "28°C",
    condition: "Sunny",
    humidity: "65%",
    windSpeed: "12 km/h"
  },
  forecast: [
    { day: "Today", icon: Sun, temp: "28°C", condition: "Sunny" },
    { day: "Tomorrow", icon: Droplets, temp: "26°C", condition: "Light Rain" },
    { day: "Wed", icon: Sun, temp: "30°C", condition: "Sunny" }
  ]
};

const quickStats = [
  { label: "Active Fields", value: "3", trend: "+1 this month", color: "text-success" },
  { label: "Crop Health", value: "92%", trend: "+5% this week", color: "text-success" },
  { label: "Irrigation Status", value: "Good", trend: "Next: Tomorrow", color: "text-accent" },
  { label: "Market Price", value: "₹45/kg", trend: "+₹3 from last week", color: "text-warning" }
];

const todayTasks = [
  { task: "Water the tomato field", priority: "high", completed: false },
  { task: "Check pest control in wheat", priority: "medium", completed: true },
  { task: "Apply fertilizer to corn", priority: "low", completed: false },
  { task: "Inspect irrigation system", priority: "high", completed: false }
];

const recentActivities = [
  { date: "Today", activity: "Applied pesticide to Field A", type: "treatment" },
  { date: "Yesterday", activity: "Harvested 200kg tomatoes", type: "harvest" },
  { date: "2 days ago", activity: "Planted new seeds in Field C", type: "planting" }
];

export default function Dashboard() {
  const completedTasks = todayTasks.filter(task => task.completed).length;
  const totalTasks = todayTasks.length;

  return (
    <div className="min-h-screen bg-gradient-card p-4 space-y-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground animate-fade-in">
              Good Morning, Farmer! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening on your farm today
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/activity">
                <Calendar className="h-4 w-4 mr-2" />
                Log Activity
              </Link>
            </Button>
            <Button asChild className="bg-gradient-primary">
              <Link to="/chatbot">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-medium transition-all animate-slide-up">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <Card className="lg:col-span-1 bg-gradient-hero shadow-medium">
            <CardHeader>
              <CardTitle className="text-primary-foreground flex items-center gap-2">
                <ThermometerSun className="h-5 w-5" />
                Weather Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <Sun className="h-12 w-12 text-yellow-300 mx-auto" />
                <p className="text-3xl font-bold text-primary-foreground">{weatherData.current.temp}</p>
                <p className="text-primary-foreground/80">{weatherData.current.condition}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
                <div className="text-center">
                  <Droplets className="h-4 w-4 text-blue-300 mx-auto mb-1" />
                  <p className="text-xs text-primary-foreground/70">Humidity</p>
                  <p className="text-sm font-semibold text-primary-foreground">{weatherData.current.humidity}</p>
                </div>
                <div className="text-center">
                  <Wind className="h-4 w-4 text-gray-300 mx-auto mb-1" />
                  <p className="text-xs text-primary-foreground/70">Wind</p>
                  <p className="text-sm font-semibold text-primary-foreground">{weatherData.current.windSpeed}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-primary-foreground/80">3-Day Forecast</p>
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <day.icon className="h-4 w-4 text-primary-foreground/70" />
                      <span className="text-sm text-primary-foreground/80">{day.day}</span>
                    </div>
                    <span className="text-sm font-medium text-primary-foreground">{day.temp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="lg:col-span-1 bg-card shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Today's Tasks
                </CardTitle>
                <Badge variant="secondary">{completedTasks}/{totalTasks}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    task.completed ? 'bg-success/10 border border-success/20' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-success border-success' 
                      : 'border-muted-foreground'
                  }`}>
                    {task.completed && <div className="w-2 h-2 bg-success-foreground rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.task}
                    </p>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs mt-1"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/activity">View All Tasks</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-1 bg-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm text-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/activity">View Full Log</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 bg-gradient-earth shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2" asChild>
                <Link to="/chatbot">
                  <MessageSquare className="h-5 w-5" />
                  Ask AI
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" asChild>
                <Link to="/activity">
                  <Calendar className="h-5 w-5" />
                  Log Activity
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" asChild>
                <Link to="/advisory">
                  <Sprout className="h-5 w-5" />
                  Get Advice
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}