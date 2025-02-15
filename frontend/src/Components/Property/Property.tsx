import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/PropertyStyle/PropertyStyle.css";

interface Property {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  unitCount: string;
  parkingSpotCount: string;
  lockerCount: string;
}

interface PropertyComponentProps {
  property: Property;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // Accept event parameter
}

const PropertyComponent: React.FC<PropertyComponentProps> = ({
  property,
  onClick,
}) => {
  const navigate = useNavigate();

  const handlePropertyClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onClick(event);
    const { imageUrl, ...rest } = property; // Extract id and imageUrl
    navigate(`/PropertyProfile/${encodeURIComponent(rest.name)}`, { state: { property: rest } }); // Pass rest of the properties to the state
  };

  return (
    <div
      className="property-container"
      data-testid="property-component"
      onClick={handlePropertyClick}
    >
      <img
        src={"Assets/property1.svg"}
        alt={property.name}
        className="item-image"
      />
      <div className="property-details">
        <h3 className="property-title">{property.name}</h3>
        <p className="property-address">{property.address}</p>
      </div>
    </div>
  );
};

export default PropertyComponent;