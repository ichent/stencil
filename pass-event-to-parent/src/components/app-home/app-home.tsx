import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  @Listen('windowClosed')
  windowClosedHandler(event: CustomEvent) {
    let data: string = event.detail;

    console.log(data + 'AppHome');
  }

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
        </p>

        <app-profile name="Ivan"></app-profile>
      </div>
    );
  }
}
