import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Clock } from "lucide-react";
import heroImage from "@/assets/hero-soccer-hall.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern soccer hall with pristine artificial turf" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Book Your Perfect
            <span className="block gradient-text bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Soccer Hall
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Find and book premium soccer halls in your area. Professional facilities, 
            instant booking, and competitive prices.
          </p>

          {/* Search Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-large max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </label>
                <Input 
                  placeholder="Enter city or area" 
                  className="border-border focus:ring-primary"
                />
              </div>
              
              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </label>
                <Input 
                  type="date" 
                  className="border-border focus:ring-primary"
                />
              </div>
              
              {/* Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Time
                </label>
                <Input 
                  type="time" 
                  className="border-border focus:ring-primary"
                />
              </div>
              
              {/* Search Button */}
              <div className="flex items-end">
                <Button variant="hero" size="lg" className="w-full h-12">
                  <Search className="h-5 w-5 mr-2" />
                  Search Halls
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 text-sm">Soccer Halls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50k+</div>
              <div className="text-white/80 text-sm">Happy Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80 text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/80 text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;