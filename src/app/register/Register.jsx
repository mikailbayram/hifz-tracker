import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormHelperText,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import * as yup from "yup";
import { auth } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const schema = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const Register = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: [],
    email: [],
    password: [],
  });
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useAuth();

  const handleChange = (e) => {
    setFormState((formState) => {
      return {
        ...formState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const register = async () => {
    try {
      const response = await auth.register({
        ...formState,
        name: formState.fullName,
      });
      authContext.signin(response.data.token, response.data.user);
    } catch (err) {
      if (err?.response?.data?.email) {
        setErrors({ ...errors, email: ["Email already in use"] });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(formState, { abortEarly: false })
      .then((valid) => {
        if (valid) {
          register();
        }
      })
      .catch((errors) => {
        const errorsMap = { fullName: [], email: [], password: [] };
        errors.inner.forEach((err) => {
          const property = err.path;
          errorsMap[property].push(err.message);
        });
        setErrors(errorsMap);
      });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Create your account</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormHelperText color="red.500">
                  {errors.fullName.length > 0 ? errors.fullName[0] : ""}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormHelperText color="red.500">
                  {errors.email.length > 0 ? errors.email[0] : ""}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "Password"}
                    placeholder="Password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="red.500">
                  {errors.password.length > 0 ? errors.password[0] : ""}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
