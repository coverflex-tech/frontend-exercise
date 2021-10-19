import { WrapItem } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";

const styleProps = {
  p: "4",
  w: ["100%", "140px", "200px"],
  h: ["140px", "140px", "200px"],
  boxShadow: "base",
  borderRadius: "md",
};

export const BenefitCardsSkeleton = ({ loading }: { loading: boolean }) => {
  if (loading)
    return (
      <>
        <Skeleton {...styleProps} />
        <Skeleton {...styleProps} />
        <Skeleton {...styleProps} />
      </>
    );

  return null;
};
