import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

type Props = {
  id: string;
  imageUrl: string | null;
};

const UploadImageButton = ({ id, imageUrl }: Props) => {
  return (
    <Button size="icon" variant="outline">
      <UploadIcon />
    </Button>
  );
};

export default UploadImageButton;
