import { FC } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

type Props = {
  imagePaths: string[];
};

export const Sprites: FC<Props> = (props) => {
  return (
    <ImageList>
      {props.imagePaths.map((path) => {
        return (
          <ImageListItem key={path}>
            <img src={path} loading="lazy" />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
