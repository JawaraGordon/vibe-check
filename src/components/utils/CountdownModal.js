const CountdownModal = ({ countdown }) => {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <h2 className="countdown-text">{countdown}</h2>
        </div>
      </div>
    );
  };
  
  export default CountdownModal;