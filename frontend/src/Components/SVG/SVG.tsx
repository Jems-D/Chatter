import { AspectRatio } from "@radix-ui/react-aspect-ratio";
interface Props {
  vectorWhite: string;
  vectorDark: string;
  statusCode: string;
}

const SVG = ({ vectorWhite, vectorDark, statusCode }: Props) => {
  const isDarkMode: boolean =
    document.documentElement.classList.contains("dark");
  const image: string = isDarkMode ? vectorWhite : vectorDark;
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src={image}
        alt={`Vector photo about ${statusCode} status code`}
        className="h-full w-full"
      />
    </AspectRatio>
  );
};

export default SVG;
