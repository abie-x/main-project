import React from "react";
import { Card, Col, Text, Row, Button } from "@nextui-org/react";

const RestaurentCard = ({ image, name, address }) => {
  return (
    <Card css={{ w: "100%" }}>
        <Card.Image
        src={image}
        width={320}
        height={220} 
        objectFit="cover"
        alt="Card image background"
        />
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
            }}
            style={{display: "flex", flexDirection: "column", justifyContent: "center"}}
            >
            <div>
                <Text color="#fff" size={17} weight="bold">
                    {name}
                </Text>
            </div>
            <div>
                {/* <Row justify="flex-end"> */}
                    {/* <Button flat auto rounded color="secondary"> */}
                    <Text
                        css={{ color: "#fff" }}
                        size={15}
                    >
                        {address}
                    </Text>
                    {/* </Button> */}
                {/* </Row> */}
                
            </div>
        </Card.Footer>
    </Card>
  );
};

export default RestaurentCard;