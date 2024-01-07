const HelpModal = ({ onClose }) => {
  return (
    <div className="modal-background-help">
      <div className="modal-content-help">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal-sub-header">Game Start</h2>
        <p className="modal-text">
          Begin your musical journey by pressing the "Start" button.
        </p>

        <h2 className="modal-sub-header">Game Setup</h2>
        <p className="modal-text">
          Set the game's intensity by using the slider to influence the song
          tempo and vibe. The combined average of both player's sliders
          determines the game difficulty
        </p>

        <h2 className="modal-sub-header">Game Play</h2>
        <p className="modal-text">
          Collaboratively type words matching the song's vibe to score points.
          Avoid repeating words or using your teammate's words. You have 60
          seconds to match or beat the top score for the chosen song!
        </p>

        <h2 className="modal-sub-header">Game Results</h2>
        <p className="modal-text">
          Check your scores and see if you've matched the right vibes. Decide to
          start a new round or quit. Refine your game experience by adjusting
          the intensity for the next round based on your previous game play.
        </p>
      </div>
    </div>
  );
};

export default HelpModal;
