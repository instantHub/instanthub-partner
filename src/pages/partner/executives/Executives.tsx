import { useState } from "react";
import { Button, FlexBox, Typography } from "@components/general";
import { CreateExecutiveForm } from "./CreateExecutiveForm";
import { ExecutivesList } from "./ExecutivesList";

export const Executives = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex flex-col gap-12">
      <FlexBox justify="end">
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          Add an Executive
        </Button>
      </FlexBox>

      <FlexBox direction="col" gap={10}>
        <Typography variant="h2">Executives list</Typography>
      </FlexBox>

      <ExecutivesList />

      <CreateExecutiveForm isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
