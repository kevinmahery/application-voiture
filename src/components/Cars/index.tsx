import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import CustomCard from "../../commons/CustomCard";
import { Container } from "./styles";
import TypeCars from "../../models/cars";
import { useAuth } from "../../context/auth.context";

const Cars = () => {
  const [cars, setCars] = useState<TypeCars[]>([]);
  const { isAuthenticate } = useAuth();

  const getAllCars = () => {
    axiosInstance.get("posts").then((result) => {
      if (result.data) {
        setCars(result.data);
      }
    });
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <Container>
      {cars.map((item) => (
        <CustomCard key={item.id} cars={item} showComment={isAuthenticate} />
      ))}
    </Container>
  );
};
export default Cars;
