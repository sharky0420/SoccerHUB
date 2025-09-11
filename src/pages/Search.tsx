import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import HallCard from "@/components/HallCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, Clock, SlidersHorizontal } from "lucide-react";

const sampleHalls = [
  {
    id: "1",
    name: "Elite Soccer Arena",
    location: "Downtown Sports Complex",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
    rating: 4.9,
    reviews: 124,
    price: 85,
    capacity: 22,
    amenities: ["WiFi", "Parking", "Changing Rooms", "Cafe"],
    available: true,
  },
  {
    id: "2",
    name: "Premier Indoor Football",
    location: "Westside Recreation Center", 
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop",
    rating: 4.8,
    reviews: 89,
    price: 75,
    capacity: 18,
    amenities: ["WiFi", "Parking", "Equipment Rental"],
    available: true,
  },
  {
    id: "3",
    name: "Champions Field",
    location: "North Valley Sports Hub",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    price: 95,
    capacity: 24,
    amenities: ["WiFi", "Parking", "Pro Shop", "Restaurant"],
    available: false,
  },
  {
    id: "4",
    name: "Metro Soccer Complex",
    location: "Central Business District",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=300&fit=crop",
    rating: 4.6,
    reviews: 203,
    price: 70,
    capacity: 20,
    amenities: ["WiFi", "Parking", "Showers"],
    available: true,
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Header */}
      <div className="pt-20 pb-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl p-6 shadow-medium">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search location, hall name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="time" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button variant="hero" className="h-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50">$0 - $50</SelectItem>
                      <SelectItem value="50-80">$50 - $80</SelectItem>
                      <SelectItem value="80-100">$80 - $100</SelectItem>
                      <SelectItem value="100+">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Amenities</label>
                  <div className="space-y-2">
                    {["WiFi", "Parking", "Changing Rooms", "Equipment Rental", "Cafe"].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Capacity</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Up to 16 players</SelectItem>
                      <SelectItem value="medium">16-20 players</SelectItem>
                      <SelectItem value="large">20+ players</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Soccer Halls</h2>
                <p className="text-muted-foreground">{sampleHalls.length} halls found</p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleHalls.map((hall) => (
                <HallCard key={hall.id} {...hall} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline">Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;