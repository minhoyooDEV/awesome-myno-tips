import { createLazyFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import axios from "axios";

export const Route = createLazyFileRoute(
  "/sending-events-after-page-rendering/use-query-isFetching"
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

const useInitialRenderComplete = (timeout: number = 1000): boolean => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRenderComplete(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  return initialRenderComplete;
};

function Page() {
  const initialRenderComplete = useInitialRenderComplete();
  const { data: data1 } = useQuery<Resource>({
    queryKey: ["resource", 10],
    queryFn: () => fetchResource(10),
  });
  const { data: data2 } = useQuery<Resource>({
    queryKey: ["resource", 20],
    queryFn: () => fetchResource(20),
    enabled: !!data1,
  });
  const { data: data3 } = useQuery<Resource>({
    queryKey: ["other-resource", 30],
    queryFn: () => fetchResource(30),
    enabled: !!data2,
  });
  const isFetching = useIsFetching();

  useEffect(() => {
    if (initialRenderComplete && isFetching === 0) {
      sendEvent();
    }
  }, [initialRenderComplete, isFetching]);

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