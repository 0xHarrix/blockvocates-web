import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Box, Flex, Text, Button, Spinner, Input } from "@chakra-ui/react";

function MissionManager() {
  const [mission, setMission] = useState({
    missionId: "",
    missionName: "",
    objective: "",
    pathId: 1,
  });

  const [steps, setSteps] = useState([]);

  const handleCreateMission = async () => {
    try {
      const missionsCollection = collection(db, "missions");
      const missionDoc = await addDoc(missionsCollection, mission);
      setMission({ ...mission, missionId: missionDoc.id });
      console.log("Mission created successfully:", missionDoc.id);
    } catch (error) {
      console.error("Error creating mission:", error);
    }
  };

  const handleAddStep = async () => {
    try {
      const missionDoc = doc(db, "missions", mission.missionId);
      const step = {
        stepId: "",
        stepName: "",
        description: "",
      };
      const stepDoc = await addDoc(collection(missionDoc, "steps"), step);
      setSteps([...steps, stepDoc]);
      console.log("Step added successfully:", stepDoc.id);
    } catch (error) {
      console.error("Error adding step:", error);
    }
  };

  const handleUpdateMission = async () => {
    try {
      const missionDoc = doc(db, "missions", mission.missionId);
      await updateDoc(missionDoc, mission);
      console.log("Mission updated successfully.");
    } catch (error) {
      console.error("Error updating mission:", error);
    }
  };

  const handleDeleteStep = async (stepId) => {
    try {
      const missionDoc = doc(db, "missions", mission.missionId);
      const stepDoc = doc(missionDoc, "steps", stepId);
      await deleteDoc(stepDoc);
      setSteps(steps.filter((step) => step.id !== stepId));
      console.log("Step deleted successfully.");
    } catch (error) {
      console.error("Error deleting step:", error);
    }
  };

  return (
    <div>
      <Box p={5}>
        <Flex justify="center">
          <Text fontSize="xl">Mission Manager</Text>
        </Flex>
        <form>
          <label>
            Mission Name:
            <Input
              type="text"
              value={mission.missionName}
              onChange={(e) =>
                setMission({ ...mission, missionName: e.target.value })
              }
              mt={2}
              variant="outline"
              color="#FFF"
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _placeholder={{ color: "#FFF" }}
              _hover={{ borderColor: "#00BAE2" }}
              _focus={{
                borderColor: "#00BAE2",
                boxShadow: "0 0 0 1px #00BAE2",
              }}
              borderRadius="8px"
              py={3}
              px={4}
              width="100%"
            />
          </label>
          <label>
            Objective:
            <Input
              type="text"
              value={mission.objective}
              onChange={(e) =>
                setMission({ ...mission, objective: e.target.value })
              }
              mt={2}
              variant="outline"
              color="#FFF"
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _placeholder={{ color: "#FFF" }}
              _hover={{ borderColor: "#00BAE2" }}
              _focus={{
                borderColor: "#00BAE2",
                boxShadow: "0 0 0 1px #00BAE2",
              }}
              borderRadius="8px"
              py={3}
              px={4}
              width="100%"
            />
          </label>
          <Button onClick={handleCreateMission}>Create Mission</Button>
        </form>
        <h2>Steps</h2>
        <ul>
          {steps.map((step) => (
            <li key={step.id}>
              <label>
                Step Name:
                <Input
                  type="text"
                  value={step.stepName}
                  onChange={(e) =>
                    setSteps(
                      steps.map((s) =>
                        s.id === step.id ? { ...s, stepName: e.target.value } : s
                      )
                    )
                  }
                  mt={2}
                  variant="outline"
                  color="#FFF"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  _placeholder={{ color: "#FFF" }}
                  _hover={{ borderColor: "#00BAE2" }}
                  _focus={{
                    borderColor: "#00BAE2",
                    boxShadow: "0 0 0 1px #00BAE2",
                  }}
                  borderRadius="8px"
                  py={3}
                  px={4}
                  width="100%"
                />
              </label>
              <label>
                Step Description:
                <Input
                  type="text"
                  value={step.description}
                  onChange={(e) =>
                    setSteps(
                      steps.map((s) =>
                        s.id === step.id ? { ...s, description: e.target.value } : s
                      )
                    )
                  }
                  mt={2}
                  variant="outline"
                  color="#FFF"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  _placeholder={{ color: "#FFF" }}
                  _hover={{ borderColor: "#00BAE2" }}
                  _focus={{
                    borderColor: "#00BAE2",
                    boxShadow: "0 0 0 1px #00BAE2",
                  }}
                  borderRadius="8px"
                  py={3}
                  px={4}
                  width="100%"
                />
              </label>
              <Button onClick={() => handleDeleteStep(step.id)}>Delete Step</Button>
            </li>
          ))}
        </ul>
        <Button onClick={handleAddStep}>Add Step</Button>
        <Button onClick={handleUpdateMission}>Update Mission</Button>
      </Box>
    </div>
  );
}

export default MissionManager;