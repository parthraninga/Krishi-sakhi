import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Droplets, 
  Bug, 
  Leaf, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ThermometerSun,
  Wind,
  MapPin
} from "lucide-react";

const advisories = [
  {
    id: "1",
    type: "weather",
    priority: "high",
    title: "Irrigation Recommendation",
    description: "Light rainfall expected in 2 days. Reduce watering schedule for tomato fields to prevent waterlogging.",
    action: "Adjust irrigation system",
    timeframe: "Next 48 hours",
    icon: Droplets,
    color: "text-blue-600"
  },
  {
    id: "2",
    type: "pest",
    priority: "urgent",
    title: "Pest Alert: Aphids",
    description: "High risk of aphid infestation detected based on weather conditions and crop stage. Early intervention recommended.",
    action: "Apply neem oil spray",
    timeframe: "Within 24 hours",
    icon: Bug,
    color: "text-red-600"
  },
  {
    id: "3",
    type: "nutrition",
    priority: "medium",
    title: "Fertilizer Application",
    description: "Corn crop is entering vegetative stage. Nitrogen application will boost growth and yield potential.",
    action: "Apply nitrogen fertilizer",
    timeframe: "This week",
    icon: Leaf,
    color: "text-green-600"
  },
  {
    id: "4",
    type: "market",
    priority: "low",
    title: "Market Price Update",
    description: "Tomato prices have increased by 15% in local markets. Consider harvesting mature crops soon.",
    action: "Plan harvest timing",
    timeframe: "Next 2 weeks",
    icon: TrendingUp,
    color: "text-yellow-600"
  }
];

const weatherInsights = {
  temperature: "28°C",
  humidity: "75%",
  windSpeed: "12 km/h",
  recommendation: "Ideal conditions for most field operations. Good day for spraying and planting activities."
};

const cropHealth = [
  { crop: "Tomatoes (Field A)", health: 92, status: "Excellent", trend: "+5%" },
  { crop: "Corn (Field B)", health: 78, status: "Good", trend: "+2%" },
  { crop: "Wheat (Field C)", health: 85, status: "Good", trend: "-3%" }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'destructive';
    case 'high': return 'default';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'secondary';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'urgent': return AlertTriangle;
    case 'high': return Clock;
    case 'medium': return Lightbulb;
    case 'low': return CheckCircle;
    default: return Lightbulb;
  }
};

export default function Advisory() {
  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-medium">
            <Lightbulb className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Personalized Advisory</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered recommendations tailored to your crops, location, and current conditions
          </p>
        </div>

        {/* Current Conditions */}
        <Card className="shadow-medium bg-gradient-hero animate-slide-up">
          <CardHeader>
            <CardTitle className="text-primary-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Current Farm Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <ThermometerSun className="h-8 w-8 text-yellow-300 mx-auto" />
                <p className="text-2xl font-bold text-primary-foreground">{weatherInsights.temperature}</p>
                <p className="text-sm text-primary-foreground/80">Temperature</p>
              </div>
              <div className="text-center space-y-2">
                <Droplets className="h-8 w-8 text-blue-300 mx-auto" />
                <p className="text-2xl font-bold text-primary-foreground">{weatherInsights.humidity}</p>
                <p className="text-sm text-primary-foreground/80">Humidity</p>
              </div>
              <div className="text-center space-y-2">
                <Wind className="h-8 w-8 text-gray-300 mx-auto" />
                <p className="text-2xl font-bold text-primary-foreground">{weatherInsights.windSpeed}</p>
                <p className="text-sm text-primary-foreground/80">Wind Speed</p>
              </div>
              <div className="text-center space-y-2">
                <CheckCircle className="h-8 w-8 text-green-300 mx-auto" />
                <p className="text-2xl font-bold text-primary-foreground">Good</p>
                <p className="text-sm text-primary-foreground/80">Conditions</p>
              </div>
            </div>
            
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <p className="text-primary-foreground/90 text-sm">
                <strong>Today's Recommendation:</strong> {weatherInsights.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Advisories */}
          <Card className="lg:col-span-2 shadow-medium bg-card animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Active Advisories
                </CardTitle>
                <Badge variant="secondary">{advisories.length} active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {advisories.map((advisory) => {
                const PriorityIcon = getPriorityIcon(advisory.priority);
                return (
                  <div 
                    key={advisory.id} 
                    className="border border-border rounded-lg p-4 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <advisory.icon className={`h-5 w-5 ${advisory.color}`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground">{advisory.title}</h3>
                          <Badge variant={getPriorityColor(advisory.priority)}>
                            <PriorityIcon className="h-3 w-3 mr-1" />
                            {advisory.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{advisory.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-foreground">Action: {advisory.action}</p>
                            <p className="text-xs text-muted-foreground">Timeline: {advisory.timeframe}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Crop Health Status */}
          <Card className="shadow-medium bg-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Crop Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cropHealth.map((crop, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{crop.crop}</span>
                    <Badge 
                      variant={crop.health >= 90 ? 'default' : crop.health >= 75 ? 'secondary' : 'destructive'}
                    >
                      {crop.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Health Score</span>
                      <span className="font-medium text-foreground">{crop.health}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          crop.health >= 90 ? 'bg-success' : 
                          crop.health >= 75 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Trend: {crop.trend}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-medium bg-gradient-earth animate-slide-up">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                Check Irrigation
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                Pest Control
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Crop Analysis
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Market Prices
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="shadow-medium bg-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              Today's Farming Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground">Optimal Timing</h4>
                <p className="text-sm text-muted-foreground">
                  Apply fertilizers early morning (6-8 AM) when temperatures are cooler and plants can absorb nutrients effectively.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground">Water Conservation</h4>
                <p className="text-sm text-muted-foreground">
                  Use drip irrigation to reduce water usage by 30-50% while maintaining optimal soil moisture levels.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground">Pest Prevention</h4>
                <p className="text-sm text-muted-foreground">
                  Regular field inspection every 2-3 days can help detect pest issues early and reduce treatment costs.
                </p>
              </div>
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground">Soil Health</h4>
                <p className="text-sm text-muted-foreground">
                  Test soil pH monthly. Most crops prefer pH between 6.0-7.0 for optimal nutrient uptake.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}