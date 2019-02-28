import { Pois, Poi } from '../interfaces';

export function fetchLocations(): Promise<Response> {
  return fetch('https://www.mydriver.com/api/v3/pois');
}

export function findLocations(pois: Pois, location: string): Poi[] {
  let foundPois: Poi[] = [];

  if (pois && Array.isArray(pois.data)) {
    foundPois = pois.data.filter((poi: Poi) => poi.city.toLowerCase().indexOf(location.toLowerCase()) >= 0);
  }

  return foundPois;
}