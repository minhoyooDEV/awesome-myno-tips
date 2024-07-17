import { createLazyFileRoute } from "@tanstack/react-router";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute(
  "/sending-events-after-page-rendering/use-query-simple"
)({
  component: Page,
});

interface Resource {
  id: number;
}

const fetchResource = async (id: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
};

const sendEvent = () => {
  console.log("sent event!!");
};

function Page() {
  const { data: data1, isLoading: isLoading1 } = useQuery<Resource>({
    queryKey: ["resource", 10],
    queryFn: () => fetchResource(10),
  });
  const { data: data2, isLoading: isLoading2 } = useQuery<Resource>({
    queryKey: ["resource", 20],
    queryFn: () => fetchResource(20),
    enabled: !!data1,
  });
  const { data: data3, isLoading: isLoading3 } = useQuery<Resource>({
    queryKey: ["other-resource", 30],
    queryFn: () => fetchResource(30),
    enabled: !!data2,
  });

  React.useEffect(() => {
    if (data1 && data2 && data3) {
      sendEvent();
    }
  }, [data1, data2, data3]);

  if (isLoading1 || isLoading2 || isLoading3) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 생략 */}
      <h2>Loggined: {"true"}</h2>
      <hr />
      <div>Data1: {data1 ? "fetched!" : "loading"}</div>
      <div>Data2: {data2 ? "fetched!" : "loading"}</div>
      <div>Data3: {data3 ? "fetched!" : "loading"}</div>
      <hr />
      <h3>
        Event Sended: {data1 && data2 && data3 ? "true" : "false"}{" "}
        {data1 && data2 && data3 && <code>(finally)</code>}
      </h3>
    </div>
  );
}
