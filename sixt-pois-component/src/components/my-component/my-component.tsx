import { Component, State } from '@stencil/core';
import { Pois } from '../../interfaces';
import { findLocations, fetchLocations } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() private isLoadingData: boolean = false;
  
  private content: Pois; 

  componentDidLoad() {
    fetchLocations()
      .then(response => response.json())
      .then(data => {
        this.content = data;
      });
  }

  handleLocationFocus() {
    this.isLoadingData = !this.content;
  }

  handleLocationBlur() {
    this.isLoadingData = false;
  }

  handleLocationChange(e) {
    let location: string = e.target.value;

    if (location.length >= 3) {
      console.log(findLocations(this.content, location));
    }
  }

  render() {
    return (
      <div class="container">
        <form>
          <div class="form-group form-location">
            <div>Location</div>
            <input 
              type="text" 
              name="location" 
              onFocus={() => this.handleLocationFocus()} 
              onBlur={() => this.handleLocationBlur()} 
              onInput={(e) => this.handleLocationChange(e)}/>
            {this.isLoadingData
              ? <div class="form-location_loading">Loading data ...</div>
              : null
            }            
          </div>
          <div class="form-group form-date">
            <div>Date</div>
            <input type="text" name="date"/>
          </div>
          <div class="form-group form-time">
            <div>Time</div>
            <input type="text" name="time"/>
          </div>
          <div class="form-group form-button">
            <input type="button" name="search" value="Search"/>
          </div>
        </form>
      </div>
    );
  }
}
