import React from "react";
import { Card, Col, Text, Row, Button } from "@nextui-org/react";

const CuisineCard = ({ image, text1, text2 }) => {
  return (
    <Card css={{ w: "100%" }}>
        <Card.Image
        src={image}
        width={300}
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
            >
            <Row>
                <Col style={{marginTop: "6px"}}>
                <Text color="#000" size={16}>
                    {text1}
                </Text>
                </Col>
                <Col>
                <Row justify="flex-end">
                    <Button flat auto rounded color="secondary">
                    <Text
                        css={{ color: "inherit" }}
                        size={13}
                        weight="bold"
                    >
                        {text2}
                    </Text>
                    </Button>
                </Row>
                </Col>
            </Row>
        </Card.Footer>
    </Card>
  );
};

export default CuisineCard;