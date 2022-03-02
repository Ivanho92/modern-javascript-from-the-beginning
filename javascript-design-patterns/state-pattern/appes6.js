class PageStateController {
  constructor() {
    this.currentState; // This line of code is optional
  }

  init(defaultState) {
    this.change(defaultState);
  }

  change(state) {
    this.currentState = state;
  }
}

class HomeState {
  constructor() {
    document.querySelector('#heading').textContent = null;
    document.querySelector('#content').innerHTML = `
      <div class="jumbotron">
        <h1 class="display-3">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
      </div>
    `;
  }
}

class AboutState {
  constructor() {
    document.querySelector('#heading').textContent = 'About Us';
    document.querySelector('#content').innerHTML = `
      <p>This is the about page</p>
    `;
  }
}

class ContactState {
  constructor() {
    document.querySelector('#heading').textContent = 'Contact Us';
    document.querySelector('#content').innerHTML = `
      <form>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;
  }
}

const page = new PageStateController; // Instantiate PageStateController
page.init(new HomeState); // Init the first state to 'HomeState'

// UI Vars
const home = document.getElementById('home'),
      about = document.getElementById('about'),
      contact = document.getElementById('contact');

// Home
home.addEventListener('click', (e) => {
  page.change(new HomeState);
  e.preventDefault();
});

// About
about.addEventListener('click', (e) => {
  page.change(new AboutState);
  e.preventDefault();
});

// Contact
contact.addEventListener('click', (e) => {
  page.change(new ContactState);
  e.preventDefault();
});