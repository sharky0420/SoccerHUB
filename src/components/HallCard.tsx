import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Star, Users, Clock, Wifi, Car } from "lucide-react";

interface HallCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  capacity: number;
  amenities: string[];
  available: boolean;
}

const HallCard: React.FC<HallCardProps> = ({
  name,
  location,
  image,
  rating,
  reviews,
  price,
  capacity,
  amenities,
  available,
}) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-smooth hover:shadow-large hover:-translate-y-1 gradient-card border-border/50">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={`${name} soccer hall`}
            className="w-full h-full object-cover transition-smooth hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <Badge 
              variant={available ? "default" : "secondary"}
              className={available ? "bg-primary shadow-glow" : ""}
            >
              {available ? "Available" : "Booked"}
            </Badge>
          </div>
          <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium text-sm">{rating}</span>
            <span className="text-white/80 text-sm">({reviews})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-2">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-1" />
            Up to {capacity} players
          </div>
          <div className="text-2xl font-bold text-primary">
            ${price}
            <span className="text-sm text-muted-foreground font-normal">/hour</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center space-x-1">
              {getAmenityIcon(amenity)}
              <span className="text-xs">{amenity}</span>
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 space-y-3">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            View Times
          </Button>
          <Button 
            variant="gradient" 
            className="flex-1"
            disabled={!available}
          >
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HallCard;