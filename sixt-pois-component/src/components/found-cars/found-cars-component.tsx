import { Component, Prop } from '@stencil/core';
import { Car } from '../../interfaces';

@Component({
  tag: 'found-cars-component',
  styleUrl: 'found-cars-component.css',
  shadow: true
})
export class FoundCarsComponent {
  @Prop() items: Car[];  
  
  render() {
    if (this.items && this.items.length) {
      return (
        <div class="cars">
          {this.items.map((item: Car) => (
            <div class="cars-item">
              <div class="cars-image"><img src={item.vehicleType.images.web}/></div>
              <div>
                <b>Example:</b>{item.vehicleType.exampleCar}<br/>
                <b>Amount:</b>{item.amount}<br/>
              </div>
            </div>
          ))}  
        </div>        
      )
    } else {
      return null;
    }
  }
}
