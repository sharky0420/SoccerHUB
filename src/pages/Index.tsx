import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HallCard from "@/components/HallCard";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Star } from "lucide-react";

// Sample hall data for the homepage
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
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Popular Halls Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Soccer Halls
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover top-rated facilities in your area. Book premium soccer halls 
              with professional amenities and flexible scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleHalls.map((hall) => (
              <HallCard key={hall.id} {...hall} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="mr-4">
              View All Halls
            </Button>
            <Button variant="hero" size="lg">
              Start Booking
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SoccerHalls?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Easy Search</h3>
              <p className="text-muted-foreground">
                Find the perfect soccer hall with our advanced search and filtering system.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Instant Booking</h3>
              <p className="text-muted-foreground">
                Book your preferred time slots instantly with our real-time availability system.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Quality Assured</h3>
              <p className="text-muted-foreground">
                All halls are verified and rated by our community for the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
