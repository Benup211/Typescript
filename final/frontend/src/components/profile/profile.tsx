import { Avatar, Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import PropTypes from "prop-types";

interface IProfile {
  name: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
  const { name = "benup" } = props;
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Avatar
        sx={{
          width: "6rem",
          height: "6rem",
          backgroundColor: "primary.dark",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h4" color="text.primary">
          {name.substring(0, 1)}
        </Typography>
      </Avatar>
      <Typography variant="h6" color="text.primary">
        Welcome,{name}
      </Typography>
      <Typography variant="body1" color="text.primary">
        This is your personal task manager
      </Typography>
    </Box>
  );
};
Profile.propTypes={
    name:PropTypes.string.isRequired,
}