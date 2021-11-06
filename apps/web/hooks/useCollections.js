import { useState, useEffect } from "react";
import api from "@api";

const useCollections = () => {
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/collections`
      );
      let json = await response.json();
      let result = json.data;

      setCollections(result.collections);
    };

    fetchCollections();
  }, []);

  return collections;
};

export default useCollections;
