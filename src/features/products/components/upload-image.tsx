import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

type Props = {
  id: string;
};

const UploadImageButton = ({ id }: Props) => {
  return (
    <Button size="icon" variant="outline">
      <UploadIcon />
    </Button>
  );
};

export default UploadImageButton;
