import { Component, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/state-tunnel/dist/types/stencil.core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  @Prop() name: String;

  @Event() windowClosed: EventEmitter;

  windowClosedHandler() {
    this.windowClosed.emit('WindowClosed');
  }

  render() {    
    return (
      <div class="app-profile">
        <p>
          Hello! My name is {this.name}!
        </p>
        <p>
          <input type="button" value="Emit" onClick={() => this.windowClosedHandler()}/>
        </p>
      </div>
    );
  }
}
