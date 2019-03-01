import { Component, Listen, EventEmitter, Event, State } from '@stencil/core';
import { Poi, SearchParams } from '../../interfaces';
import { fetchOffers, formatStartDate } from '../../utils/utils';

@Component({
  tag: 'form-component',
  styleUrl: 'form-component.css',
  shadow: true
})
export class FormComponent {
  searchParams: SearchParams;
  
  @State() isDateTimeFieldInvalid: boolean; 
  @Event() foundCars: EventEmitter;

  componentDidLoad() {
    this.searchParams = {
      originPlaceId: '',
      selectedStartDate: '',
      duration: '',
      type: 'DURATION'
    };
    this.isDateTimeFieldInvalid = false;
  }

  @Listen('poiSelected')
  poiSelected(event: CustomEvent) {
    let poi: Poi = event.detail;

    this.searchParams.originPlaceId = poi.placeId;
  }

  handleSearchCars() {
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

    if (this.searchParams.selectedStartDate.match(regex) === null) {
      this.isDateTimeFieldInvalid = true;
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
      this.isDateTimeFieldInvalid = false;
      this.searchParams.selectedStartDate = val;
    }
  }

  getDateTimeFieldClassName() {
    let errorClassName = this.isDateTimeFieldInvalid ? 'error' : '';

    return `form-group form-date-time ${errorClassName}`;
  }

  render() {
    return (      
      <form>
        <location-component></location-component>
        <div class={this.getDateTimeFieldClassName()}>
          <div>DateTime</div>
          <input type="text" name="dateTime" onInput={(e) => this.handleChangeDateTime(e)}/>
        </div>
        <div class="form-group form-duration">
          <div>Duration</div>
          <input type="number" min="2" max="4" name="duration" onInput={(e) => this.handleChangeDuration(e)}/>
        </div>
        <div class="form-group form-button">
          <input type="button" name="search" value="Search" onClick={() => this.handleSearchCars()}/>
        </div>
      </form>
    );
  }
}
