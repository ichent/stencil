import { Component, Listen, EventEmitter, Event, State } from '@stencil/core';
import { Poi, SearchParams } from '../../interfaces';
import { fetchOffers, formatStartDate, getThreeDaysAheadDateTime } from '../../utils/utils';

@Component({
  tag: 'form-component',
  styleUrl: 'form-component.css',
  shadow: true
})
export class FormComponent {
  searchParams: SearchParams;
  
  @State() errorMessage: string;
  @Event() foundCars: EventEmitter;

  componentDidLoad() {
    this.searchParams = {
      originPlaceId: '',
      selectedStartDate: '',
      duration: '',
      type: 'DURATION'
    };
  }

  @Listen('poiSelected')
  poiSelected(event: CustomEvent) {
    let poi: Poi = event.detail;

    this.searchParams.originPlaceId = poi.placeId;
  }

  handleSearchCars() {
    this.showMessageError('');

    if (this.isSearchParamsValid()) {
      this.searchParams.selectedStartDate = formatStartDate(this.searchParams.selectedStartDate);

      fetchOffers(this.searchParams)
        .then(response => response.json())
        .then(data => {
            this.foundCars.emit(data);
      });
    }    
  }

  isSearchParamsValid() {
    let regex = /^[\d]{4}-[\d]{2}-[\d]{2}[\s]{1}[\d]{2}:[\d]{2}$/;

    if (!this.searchParams.originPlaceId) {
      this.showMessageError('Please, fill and select the field "Location"');
      return false;
    }

    if (this.searchParams.selectedStartDate.match(regex) === null) {
      this.showMessageError('Please, fill and select the field "DateTime"');
      return false;
    }

    if (this.searchParams.selectedStartDate.match(regex) === null) {
      this.showMessageError('The field "DateTime" has invalid format');
      return false;
    }

    if (!this.searchParams.duration) {
      this.showMessageError('Please, fill the field "Duration"');
      return false;
    }

    return true;
  }

  handleChangeDuration(e) {
    let val : string = e.target.value;

    if (val) {
      this.searchParams.duration = (60 * +val) + '';
    }
  }

  handleChangeDateTime(e) {
    let val : string = e.target.value;

    if (val) {
      this.searchParams.selectedStartDate = val;
    }
  }

  showMessageError(message: string) {
    this.errorMessage = message;
  }

  render() {
    return (      
      <form>
        <location-component></location-component>
        <div class="form-group form-date-time">
          <div>DateTime</div>
          <input required type="text" name="dateTime" onInput={(e) => this.handleChangeDateTime(e)} placeholder={getThreeDaysAheadDateTime()}/>
        </div>
        <div class="form-group form-duration">
          <div>Duration</div>
          <input required type="number" min="2" max="4" name="duration" onInput={(e) => this.handleChangeDuration(e)}/>
        </div>
        <div class="form-group form-button">
          <input type="button" name="search" value="Search" onClick={() => this.handleSearchCars()}/>
        </div>
        {this.errorMessage
          ? <div>
              <div class="error-message">{this.errorMessage}</div>
            </div>
          : null
        }        
      </form>
    );
  }
}
