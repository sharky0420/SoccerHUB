export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Map: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Filters: undefined;
  VenueDetail: { venueId: string } | undefined;
};
