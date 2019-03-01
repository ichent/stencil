import { Component, State, Listen } from '@stencil/core';
import { Pois, Poi } from '../../interfaces';
import { findLocations, fetchLocations, getAddress } from '../../utils/utils';

@Component({
  tag: 'location-component',
  styleUrl: 'location-component.css',
  shadow: true
})
export class LocationComponent {
  @State() isLoadingData: boolean = false;
  @State() foundPois: Poi[] = []; 
  @State() locationValue: string;

  private content: Pois;  

  componentDidLoad() {
    fetchLocations()
      .then(response => response.json())
      .then(data => {
        this.content = data;
        this.isLoadingData = false;    
      });
  }

  @Listen('poiSelected')
  poiSelected(event: CustomEvent) {
    let poi: Poi = event.detail;

    this.locationValue = getAddress(poi, 'en').label;
    this.foundPois = [];
  }

  handleLocationFocus() {
    this.isLoadingData = !this.content;
  }

  handleLocationBlur() {
    this.isLoadingData = false;
  }

  handleLocationChange(e) {
    let location: string = e.target.value;

    this.locationValue = location;

    if (location.length >= 3) {
      this.foundPois = findLocations(this.content, location);
    }
  }

  render() {
    return (
      <div class="form-group form-location">
        <div>Location</div>
        <input 
          type="text" 
          name="location"
          value={this.locationValue}
          onFocus={() => this.handleLocationFocus()} 
          onBlur={() => this.handleLocationBlur()} 
          onInput={(e) => this.handleLocationChange(e)}/>
        {this.isLoadingData
          ? <div class="form-location_loading">Loading data ...</div>
          : null
        }
        {this.foundPois && this.foundPois.length > 0
          ? <search-locations-component pois={this.foundPois}></search-locations-component>
          : null
        }
      </div>
    );
  }
}
