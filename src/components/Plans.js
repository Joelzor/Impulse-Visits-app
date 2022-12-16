import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Plans = ({ plans }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({ query });
    navigate({ pathname: "/activities", search: params.toString() });
  };

  return (
    <section className="w-[980px]">
      <Header
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        title="Your plans"
      />
      <section className="section-container"></section>
    </section>
  );
};

export default Plans;
