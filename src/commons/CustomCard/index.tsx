import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import carsImage0 from "../../assets/images/cars0.jpg";
import carsImage1 from "../../assets/images/cars1.jpg";
import SendIcon from "@mui/icons-material/Send";
import Comment from "../Comment";
import Cars from "../../models/cars";
import { FC, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import CommentType from "../../models/commentType";

const CardContainer = styled(Card)(() => ({
  marginBottom: 16,
}));

const CardActionContainer = styled(CardActions)(() => ({
  padding: 0,
}));

const TextFieldContent = styled(OutlinedInput)(() => ({
  width: "100%",

  "& fieldset": {
    borderRadius: "none",
    borderColor: "rgb(0 0 0 / 10%)",
  },
}));

interface CustomCardProps {
  cars: Cars;
  showComment: boolean;
}

const CustomCard: FC<CustomCardProps> = ({ cars, showComment }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [myComment, setMyComment] = useState<string>("");

  const getAllComments = (carsItem: Cars) => {
    axiosInstance.get(`posts/${carsItem.id}/comments`).then((result) => {
      if (result.data) {
        setComments(result.data);
      }
    });
  };

  const handleAddComment = () => {
    const commentsClone = [...comments];
    commentsClone.push({
      id: commentsClone.length + 1,
      email: "Me@me.com",
      name: "",
      body: myComment,
    });
    setComments(commentsClone);
  };

  useEffect(() => {
    if (cars) {
      getAllComments(cars);
    }
  }, [cars]);

  return (
    <CardContainer sx={{ maxWidth: 600, width: "100%" }}>
      <CardHeader title={cars.title} subheader="October 01, 2021" />
      <CardMedia
        component="img"
        height="350"
        image={cars.id % 2 === 0 ? carsImage0 : carsImage1}
        alt="icone"
      />
      <CardContent>
        {showComment &&
          comments.map((item) => <Comment key={item.id} comment={item} />)}
      </CardContent>
      {showComment && (
        <CardActionContainer>
          <TextFieldContent
            id="outlined-basic"
            placeholder="Ajouter un commentaire ..."
            onChange={(event) => setMyComment(event.target.value)}
            value={myComment}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleAddComment}
                  edge="end"
                  disabled={myComment.length === 0}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </CardActionContainer>
      )}
    </CardContainer>
  );
};
export default CustomCard;
