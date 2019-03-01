import { Pois, Poi, Translation, Address, SearchParams } from '../interfaces';

export function fetchLocations(): Promise<Response> {
  return fetch('https://www.mydriver.com/api/v3/pois', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function fetchOffers(params: SearchParams) {
  return fetch("https://www.mydriver.com/api/v3/offers", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

export function findLocations(pois: Pois, location: string): Poi[] {
  let foundPois: Poi[] = [];

  if (pois && Array.isArray(pois.data)) {
    foundPois = pois.data.filter((poi: Poi) => poi.city.toLowerCase().indexOf(location.toLowerCase()) >= 0);
  }

  return foundPois;
}

export function getAddress(poi: Poi, locale: string): Address {
  let translations: Translation[] = poi.translations.filter((item: Translation) => item.locale === locale);

  if (translations && translations.length) {
    let translation: Translation = translations[0];
    
    return { label: translation.label, address: translation.address };
  } else {
    return { label: poi.city, address: '' };
  }
}

export function formatStartDate(startDate: string) {
  let dateParts: string[] = startDate.split(' ');
  let countHours: number = -(new Date()).getTimezoneOffset()/60;

  dateParts.push((countHours.toString().length === 1 ? '0' + countHours : countHours) + ':00');
  
  return `${dateParts[0]}T${dateParts[1]}:00+${dateParts[2]}`;
}

export function formatAddress(poi: Poi, locale: string) {
  let address: Address = getAddress(poi, locale);
  
  return `${address.label} - ${address.address}`;
}