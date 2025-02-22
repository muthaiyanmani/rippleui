import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { titleToSlug } from "../../utils/titleToSlug";

interface Props {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({ id = "", level = 1, children, className }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.split("#")[1] === id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [id]);

  const calculateHeadingLevel = (level: number) => {
    switch (level) {
      case 1:
        return "text-5xl font-semibold";
      case 2:
        return "text-4xl font-semibold";
      case 3:
        return "text-3xl font-semibold";
      case 4:
        return "text-2xl font-semibold";
      default:
        return "text-xl font-semibold";
    }
  };
  const getCSS = (level: number): string => {
    switch (level) {
      case 1:
        return "pb-3";
      case 2:
        return "pb-3 mt-10";
      case 3:
        return "pb-3 mt-8";
      case 4:
        return "pb-3 mt-4";
      default:
        return "pb-3 mt-4";
    }
  };
  const seRouteId = () => {
    if (id) {
      router.push(`${router.asPath.split("#")[0]}#${id}`);
    }
  };

  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <>
      <CustomTag
        className={clsx(
          "flex cursor-pointer items-center gap-2 hover:text-gray-900",
          getCSS(level),
          calculateHeadingLevel(level)
        )}
        onClick={seRouteId}
      >
        {children}

        <span
          className={
            "mark text-xl font-semibold  text-content2 opacity-0 transition-opacity ease-in-out"
          }
        >
          #
        </span>
        <span
          className="pointer-events-none relative top-[-90px] left-0 opacity-0"
          id={id}
        >
          &nbsp;
        </span>
      </CustomTag>
    </>
  );
};

export const headingDynamic = ({ level }: Props) => {
  // eslint-disable-next-line react/display-name
  return (props: Props) => {
    return (
      <Heading
        level={level}
        id={titleToSlug(props.children?.toString() as string)}
      >
        {props.children}
      </Heading>
    );
  };
};
