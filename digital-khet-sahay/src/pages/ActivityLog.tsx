import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Droplets, 
  Scissors, 
  Sprout, 
  Bug,
  Beaker,
  Edit,
  Trash2
} from "lucide-react";

interface Activity {
  id: string;
  date: Date;
  type: string;
  description: string;
  field: string;
  notes?: string;
}

const activityTypes = [
  { value: "watering", label: "Watering", icon: Droplets, color: "text-blue-600" },
  { value: "planting", label: "Planting", icon: Sprout, color: "text-green-600" },
  { value: "harvesting", label: "Harvesting", icon: Scissors, color: "text-orange-600" },
  { value: "fertilizing", label: "Fertilizing", icon: Beaker, color: "text-purple-600" },
  { value: "pest-control", label: "Pest Control", icon: Bug, color: "text-red-600" }
];

const sampleActivities: Activity[] = [
  {
    id: "1",
    date: new Date(),
    type: "watering",
    description: "Watered tomato field",
    field: "Field A",
    notes: "Used drip irrigation system"
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000),
    type: "harvesting",
    description: "Harvested 200kg tomatoes",
    field: "Field B",
    notes: "Good quality harvest"
  },
  {
    id: "3",
    date: new Date(Date.now() - 172800000),
    type: "planting",
    description: "Planted new corn seeds",
    field: "Field C",
    notes: "Used hybrid variety seeds"
  }
];

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: "",
    description: "",
    field: "",
    notes: ""
  });

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType ? activityType.icon : Sprout;
  };

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType ? activityType.color : "text-gray-600";
  };

  const getActivityLabel = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType ? activityType.label : type;
  };

  const filteredActivities = selectedDate
    ? activities.filter(activity => 
        activity.date.toDateString() === selectedDate.toDateString()
      )
    : activities;

  const handleAddActivity = () => {
    if (!newActivity.type || !newActivity.description || !newActivity.field) return;

    const activity: Activity = {
      id: Date.now().toString(),
      date: selectedDate || new Date(),
      type: newActivity.type,
      description: newActivity.description,
      field: newActivity.field,
      notes: newActivity.notes
    };

    setActivities(prev => [activity, ...prev]);
    setNewActivity({ type: "", description: "", field: "", notes: "" });
    setIsAddingActivity(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
            <p className="text-muted-foreground">
              Track and manage all your farming activities
            </p>
          </div>
          
          <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-medium">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
                <DialogDescription>
                  Record a new farming activity for today
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Type</label>
                  <Select value={newActivity.type} onValueChange={(value) => 
                    setNewActivity(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-4 w-4 ${type.color}`} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={newActivity.description}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the activity"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Field</label>
                  <Input
                    value={newActivity.field}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, field: e.target.value }))}
                    placeholder="e.g., Field A, North Plot"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes or observations"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingActivity(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddActivity} className="bg-gradient-primary">
                  Add Activity
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1 shadow-medium bg-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasActivity: activities.map(a => a.date)
                }}
                modifiersStyles={{
                  hasActivity: { 
                    backgroundColor: 'hsl(var(--primary))', 
                    color: 'hsl(var(--primary-foreground))' 
                  }
                }}
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Legend:</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Days with activities</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities List */}
          <Card className="lg:col-span-2 shadow-medium bg-card animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Activities for {selectedDate?.toLocaleDateString() || 'All Days'}
                </CardTitle>
                <Badge variant="secondary">
                  {filteredActivities.length} activities
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {filteredActivities.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">No activities found</p>
                    <p className="text-sm text-muted-foreground">
                      No farming activities recorded for this date
                    </p>
                  </div>
                  <Button onClick={() => setIsAddingActivity(true)} className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Activity
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredActivities.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-muted rounded-lg">
                              <ActivityIcon className={`h-5 w-5 ${getActivityColor(activity.type)}`} />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-foreground">{activity.description}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {getActivityLabel(activity.type)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {activity.field} • {activity.date.toLocaleDateString()}
                              </p>
                              {activity.notes && (
                                <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-2 rounded">
                                  {activity.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <Card className="mt-6 shadow-medium bg-gradient-earth animate-slide-up">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {activityTypes.map((type) => {
                const count = activities.filter(a => a.type === type.value).length;
                return (
                  <div key={type.value} className="text-center space-y-2">
                    <div className="p-3 bg-card/50 rounded-lg">
                      <type.icon className={`h-6 w-6 ${type.color} mx-auto`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-sm text-muted-foreground">{type.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}