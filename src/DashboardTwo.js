import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner } from "@chakra-ui/react";
import "./styles/Dashboard.css";
import { db } from './firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, doc, collection, where, query, getDoc } from 'firebase/firestore';
import { useToast } from "@chakra-ui/react";

const DashboardMain = () => {


  return (
    <Heading>Hello</Heading>
  );
};

export default DashboardMain;
