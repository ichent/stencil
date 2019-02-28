export interface Translation {
    address: string;
    label: string;
    locale: string;
  }
  
  export interface Poi {
    id: number;
    placeId: string;
    city: string;
    translations: Translation[];
  }
  
  export interface Pois {
    data: Poi[];
    totals: number;
  }