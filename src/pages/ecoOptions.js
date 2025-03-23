import React, { useState } from "react";
import { toast } from "react-toastify";
import "../css/ecoOptions.css";

const EcoOptions = ({ nextStep, previousStep, updateOrderDetails }) => {
  const [ecoFriendlyPackaging, setEcoFriendlyPackaging] = useState(false);
  const [treePlantingContribution, setTreePlantingContribution] = useState(0);

  const handleSubmit = () => {
    updateOrderDetails({
      ecoFriendlyPackaging: ecoFriendlyPackaging,
      treePlantingContribution: treePlantingContribution,
    });
    toast.success("Eco options updated successfully!");
    nextStep();
  };

  return (
    <div className="eco-options-container">
      <h2>Eco-Friendly Options</h2>
      <div className="eco-option">
        <label>
          <input
            type="checkbox"
            checked={ecoFriendlyPackaging}
            onChange={(e) => setEcoFriendlyPackaging(e.target.checked)}
          />
          Use Sustainable Packaging (Recycled Paper & Jute Bag)
        </label>
        {ecoFriendlyPackaging && (
          <p className="eco-badge">This reduces 500g of plastic waste!</p>
        )}
      </div>
      <div className="eco-option">
        <label>
          <input
            type="checkbox"
            checked={treePlantingContribution > 0}
            onChange={(e) =>
              setTreePlantingContribution(e.target.checked ? 300 : 0)
            }
          />
          Add LKR 300 to plant a tree & offset your carbon footprint!
        </label>
        {treePlantingContribution > 0 && (
          <p className="eco-badge">You helped plant 1 tree!</p>
        )}
      </div>
      <div className="eco-navigation-buttons">
        <button onClick={previousStep}>Back</button>
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default EcoOptions;
