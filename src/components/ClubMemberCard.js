// ClubMemberCard.js
import React from "react";
import { Card, CardBody, Text } from "@chakra-ui/react";

const ClubMemberCard = ({ member, details, clubName }) => {
  return (
    <Card
      mt={4}
      borderRadius="md"
      boxShadow="md"
      marginRight={5}
      width={200}
      height={270}
      color={"white"}
      bg={"linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2));"}
      textAlign={"center"}
    >
      <CardBody>
        {details && (
          <>
            <Text>User Name: {details.name}</Text>
            <br />
            <Text>Club Name: {clubName}</Text>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default ClubMemberCard;
