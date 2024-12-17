import { Button, buttonVariants } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { useEditProduct } from "../api/use-edit-product";
import { toast } from "sonner";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

type Props = {
  id: string;
};

const UploadImageButton = ({ id }: Props) => {
  const { mutate: editProduct } = useEditProduct(id);

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => toast.loading("Uploading...", { id: "uploading" }),
    onUploadError: () => {
      toast.dismiss("uploading");
      toast.error("Upload failed. Please try again");
    },
    onClientUploadComplete(res) {
      editProduct({ json: { image_url: res[0]?.url }, param: { id } });
      toast.dismiss("uploading");
      toast.success("Image uploaded");
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadIcon className="size-5" />
      </label>
      <input
        id="upload-button"
        type="file"
        className={cn("sr-only", buttonVariants({ variant: "ghost" }))}
        {...inputProps}
      />
    </div>
  );
};

export default UploadImageButton;
