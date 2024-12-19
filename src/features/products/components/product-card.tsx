import { Card, CardContent } from "@/components/ui/card";
import { SelectProductType } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: SelectProductType;
};

// TODO: Update the card markup and styling
const ProductCard = ({ product }: Props) => {
  return (
    <Link href="/">
      <Card className="h-96 w-64 rounded-sm bg-white">
        <CardContent className="relative px-0 pb-2">
          <Image
            src={product.image_url ?? ""}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-md object-fill"
          />
          <div>
            <p className="text-center text-lg font-semibold">{product.name}</p>
            <p className="text-center text-xs text-muted-foreground">
              {product.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
