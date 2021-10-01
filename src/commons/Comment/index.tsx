import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import CommentType from "../../models/commentType";

const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: 18,
  "& .MuiAvatar-root": {
    marginRight: 16,
  },
}));

interface CommentProps {
  comment: CommentType;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <Container>
      <Avatar>{comment.email.slice(0, 1)}</Avatar>
      <Typography variant="body2" color="text.primary">
        {comment.body}
      </Typography>
    </Container>
  );
};
export default Comment;
