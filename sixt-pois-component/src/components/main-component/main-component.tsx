import { Component, Listen, State } from '@stencil/core';
import { Car } from '../../interfaces';

@Component({
  tag: 'main-component',
  styleUrl: 'main-component.css',
  shadow: true
})
export class MainComponent {
  
  @State() foundCars: Car[];

  @Listen('foundCars')
  foundCarsHandler(event: CustomEvent) {
    let foundCars: Car[] = event.detail;

    this.foundCars = foundCars;
  }

  render() {
    return (
      <div>
        <div class="container">
          <form-component></form-component>
        </div>        
        <found-cars-component items={this.foundCars}></found-cars-component>        
      </div>      
    );
  }
}
