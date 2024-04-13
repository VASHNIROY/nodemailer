import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [toName, setToName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    try {
      if (!email.trim() || !designation || !toName.trim() || !companyName.trim() || !position.trim()) {
        alert("Please enter all fields");
        return;
      }
      
      if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
        alert("Please enter a valid gmail address");
        return;
      }

      const data = {
        email,
        designation,
        toName,
        companyName,
        position,
      };

      console.log(data);

      const res = await fetch(`${baseUrl}/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      if (res.status > 199 && res.status < 300) {
        alert("Send Successfully !");
        setEmail("");
        setToName("");
        setCompanyName("");
        setPosition("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Send email to the account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                placeholder="Receiver's Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>To</FormLabel>
              <Select
                placeholder="Select Type"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              >
                <option>HR</option>
                <option>Employee</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>To Name</FormLabel>
              <Input
                placeholder="Name"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <Input
                placeholder="Position Name"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={sendEmail}
              >
                Send Email
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
