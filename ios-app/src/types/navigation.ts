export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Filters: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  VenueDetail: { venueId: string } | undefined;
};
