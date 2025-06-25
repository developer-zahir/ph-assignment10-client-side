import { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = `GardenHub - ${title}`;
  }, [title]);

  return null;
};

export default PageTitle;
