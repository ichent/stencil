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

  export interface Address {
    label: string;
    address: string;
  }

  export interface SearchParams {
    originPlaceId: string;
    selectedStartDate: string;
    duration: string;
    type: string;  
  };
  
  export interface VehicleType {
    id: number;
    name: string;
    images: {
      native: string;
      web: string;
    }
    exampleCar: string;
  }
  
  export interface Car {
    amount: number;
    amountNet: number;
    finalAmountGross: number;
    currency: string;
    vehicleType: VehicleType;
  }