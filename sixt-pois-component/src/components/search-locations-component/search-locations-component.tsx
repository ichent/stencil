import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Poi } from '../../interfaces';
import { formatAddress } from '../../utils/utils';

@Component({
  tag: 'search-locations-component',
  styleUrl: 'search-locations-component.css',
  shadow: true
})
export class SearchLocationsComponent {
  @Prop() pois: Poi[];
  @Event() poiSelected: EventEmitter;
  
  handleSelectLocation(poi: Poi) {
    this.poiSelected.emit(poi);
  }

  render() {
    return (
      <div class="search-locations">
        {this.pois.map((poi: Poi) => (
          <div class="search-locations-item" onClick={() => this.handleSelectLocation(poi)}>{formatAddress(poi, 'en')}</div>
        ))}
      </div>
    );
  }
}
