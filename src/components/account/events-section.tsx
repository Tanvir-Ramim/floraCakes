"use client";

import type React from "react";

import {
  Calendar,
  CalendarIcon,
  Clock,
  MapPin,
  Plus,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import Button from "../ui/button/button";
import { Badge } from "../ui/card/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/card/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/card/tabs";
import Input from "../ui/input/Input";
import Textarea from "../ui/input/TextArea";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  status: 'upcoming' | 'past';
  cakeOrdered: boolean;
  orderIds: string[];
}

// Sample events data
const events: Event[] = [
  {
    id: "evt-001",
    title: "Birthday Party",
    date: "2023-06-15",
    time: "3:00 PM - 6:00 PM",
    location: "Home, 123 Main St, Gulshan",
    description: "Annual birthday celebration with family and friends",
    attendees: 15,
    status: "upcoming",
    cakeOrdered: true,
    orderIds: ["ORD-2023-1234"],
  },
  {
    id: "evt-002",
    title: "Office Anniversary",
    date: "2023-07-22",
    time: "1:00 PM - 4:00 PM",
    location: "Office Building, 456 Business Ave",
    description: "Company's 5th anniversary celebration",
    attendees: 30,
    status: "upcoming",
    cakeOrdered: true,
    orderIds: ["ORD-2023-1456"],
  },
  {
    id: "evt-003",
    title: "Wedding Reception",
    date: "2023-05-10",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Ballroom, Luxury Hotel",
    description: "Wedding reception for John and Sarah",
    attendees: 100,
    status: "past",
    cakeOrdered: true,
    orderIds: ["ORD-2023-0987", "ORD-2023-0988"],
  },
  {
    id: "evt-004",
    title: "Graduation Party",
    date: "2023-04-05",
    time: "4:00 PM - 8:00 PM",
    location: "University Garden",
    description: "Graduation celebration for the Class of 2023",
    attendees: 50,
    status: "past",
    cakeOrdered: true,
    orderIds: ["ORD-2023-0765"],
  },
];

export default function EventsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    attendees: "",
  });

  const filteredEvents = events
    .filter((event) => event.status === activeTab)
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCreateEvent = () => {
    // Validate form
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location
    ) {
      //   info("Please fill in all required fields");
      return;
    }

    // In a real app, this would send data to the server
    // success("Event created successfully!");
    setIsCreateEventOpen(false);

    // Reset form
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      attendees: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleShareEvent = (eventId: string) => {
    console.log(eventId);
    // In a real app, this would generate a sharing link
    // success("Event sharing link copied to clipboard!");
  };

  const handleReorderCake = (orderId: string) => {
    console.log(orderId);
    // In a real app, this would add the cake to the cart
    // success("Cake added to cart for reordering!");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">My Events</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-[60%] transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              label="Search"
              name="search"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>

          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center w-40 h-10 mt-5 gap-2" label={ <>   <Plus size={16} />
                <span>Create Event</span></>} /> 
              
         
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add details for your upcoming event. You can order a cake for
                  this event later.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Input
                    label="Event Title"
                    id="title"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Birthday Party, Anniversary, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      id="date"
                      label="Date"
                      name="date"
                      type="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="time"
                      label="Time"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                      placeholder="e.g., 3:00 PM - 6:00 PM"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    id="location"
                    name="location"
                    label="Location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Address or venue name"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    id="description"
                    name="description"
                    label="Description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Add details about your event"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button label="Cancel" onClick={() => setIsCreateEventOpen(false)} variant="outline"/>
                
                <Button
                  label="Create Event"
                  onClick={handleCreateEvent}
                ></Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No upcoming events found</p>
                <Button
                  label=" Create Your First Event"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsCreateEventOpen(true)}
                ></Button>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onShare={handleShareEvent}
                onReorder={handleReorderCake}
                showReorder={true}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-5 lg:mt-0">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No past events found</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onShare={handleShareEvent}
                onReorder={handleReorderCake}
                showReorder={true}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EventCardProps {
  event: Event;
  onShare: (eventId: string) => void;
  onReorder: (orderId: string) => void;
  showReorder: boolean;
}

function EventCard({ event, onShare, onReorder, showReorder }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle>{event.title}</CardTitle>
          {event.status === "upcoming" && (
            <Badge className="bg-green-100 text-green-800">Upcoming</Badge>
          )}
        </div>
        <CardDescription>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm mb-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span>{event.attendees} attendees</span>
        </div>

        <p className="text-sm text-gray-700 mb-3">{event.description}</p>

        {isExpanded && event.cakeOrdered && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">
              Cakes Ordered for this Event:
            </h4>
            <ul className="space-y-2">
              {event.orderIds.map((orderId: string) => (
                <li
                  key={orderId}
                  className="text-sm flex justify-between items-center"
                >
                  <span>Order #{orderId}</span>
                  {showReorder && (
                    <Button
                      variant="outline"
                      label="Reorder"
                      onClick={() => onReorder(orderId)}
                    ></Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between gap-5 pt-0">
        <Button
          variant="primary"
          label={isExpanded ? "Show Less" : "Show More"}
          onClick={() => setIsExpanded(!isExpanded)}
        ></Button>

        <Button
          variant="outline"
          label="Share"
          className="flex items-center gap-1"
          onClick={() => onShare(event.id)}
        >
          <Share2 size={14} />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
