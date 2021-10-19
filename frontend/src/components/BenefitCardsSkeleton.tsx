import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";
import { cardStyleProps } from "./BenefitCard";

export const BenefitCardsSkeleton = ({ loading }: { loading: boolean }) => {
  if (loading)
    return (
      <>
        <Skeleton {...cardStyleProps} />
        <Skeleton {...cardStyleProps} />
        <Skeleton {...cardStyleProps} />
      </>
    );

  return null;
};
