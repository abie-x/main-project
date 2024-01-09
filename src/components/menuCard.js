import React from "react";
import { Card, Col, Text, Row, Button } from "@nextui-org/react";

const MenuCard = ({ image }) => {
  return (
    <Card css={{ w: "100%" }}>
        <Card.Image
        src={image}
        width={250}
        height={230} 
        objectFit="cover"
        alt="Card image background"
        />
    </Card>
  );
};

export default MenuCard;