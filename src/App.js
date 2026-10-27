import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    person: {
      fullName: 'Avery Johnson',
      bio: 'Curious by nature and passionate about building thoughtful digital experiences.',
      imgSrc:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=85',
      profession: 'Product Designer',
    },
    shows: false,
    elapsedSeconds: 0,
  };

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState(({ elapsedSeconds }) => ({
        elapsedSeconds: elapsedSeconds + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  toggleProfile = () => {
    this.setState(({ shows }) => ({ shows: !shows }));
  };

  formatElapsedTime = () => {
    const { elapsedSeconds } = this.state;
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    return [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, '0'))
      .join(':');
  };

  render() {
    const { person, shows } = this.state;

    return (
      <main className="app-shell">
        <section className="profile-panel" aria-labelledby="page-title">
          <div className="panel-heading">
            <p className="eyebrow">A little introduction</p>
            <h1 id="page-title">People make the work.</h1>
            <p className="intro-copy">
              Get to know the person behind the ideas.
            </p>
          </div>

          <button
            className="toggle-button"
            type="button"
            onClick={this.toggleProfile}
            aria-expanded={shows}
            aria-controls="person-profile"
          >
            {shows ? 'Hide profile' : 'Show profile'}
            <span aria-hidden="true">{shows ? '−' : '+'}</span>
          </button>

          {shows && (
            <article className="person-card" id="person-profile">
              <img
                className="person-image"
                src={person.imgSrc}
                alt={person.fullName}
              />
              <div className="person-details">
                <p className="person-profession">{person.profession}</p>
                <h2>{person.fullName}</h2>
                <p className="person-bio">{person.bio}</p>
              </div>
            </article>
          )}

          <div className="session-timer" role="status" aria-live="polite">
            <span className="timer-indicator" aria-hidden="true" />
            <span>Time since mounted</span>
            <strong>{this.formatElapsedTime()}</strong>
          </div>
        </section>
        <p className="page-note">A profile is just the beginning.</p>
      </main>
    );
  }
}

export default App;
