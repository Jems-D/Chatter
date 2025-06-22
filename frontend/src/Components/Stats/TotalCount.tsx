import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  count: number | undefined;
  forInteractions: "yes" | "no";
}

const TotalCount = ({ count, forInteractions }: Props) => {
  if (typeof count === "undefined") {
    return null;
  }
  return (
    <Card
      className="text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] 
    h-auto flex-col gap-2 dark:bg-[var(--color_appledark)] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[var(--color_applewhite)] w-[300px]"
    >
      <CardHeader>
        <CardTitle>
          {forInteractions === "no"
            ? "Total number of users"
            : "Total number of interactions"}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-4xl">{count}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TotalCount;
