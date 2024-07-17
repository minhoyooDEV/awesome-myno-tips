import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute(
  "/sending-events-after-page-rendering/use-state"
)({
  component: Page,
});

const fetchPosts = async ({ postId }: { postId: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.json();
};

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data1, setData1] = useState<{ id: number } | null>(null);
  const [data2, setData2] = useState<{ id: number } | null>(null);
  const [data3, setData3] = useState<{ id: number } | null>(null);

  const sendEvent = () => {
    console.log("sent event!!");
  };

  useEffect(() => {
    const authenticate = async () => {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1000);
    };

    authenticate();
  }, []);

  useEffect(() => {
    if (!data1) return;
    fetchPosts({ postId: 20 }).then((response) => {
      setData1(response);
    });
  }, [data1]);

  useEffect(() => {
    if (!data2) return;
    fetchPosts({ postId: 20 }).then((response) => {
      setData2(response);
    });
  }, [data2]);

  useEffect(() => {
    if (!data3) return;
    fetchPosts({ postId: 20 }).then((response) => {
      setData3(response);
    });
  }, [data3]);

  useEffect(() => {
    if (data1?.id && data2?.id && data3?.id) {
      sendEvent();
    }
  }, [data1?.id, data2?.id, data3?.id]);

  return (
    <div>
      <h2>Loggined: {"" + isAuthenticated}</h2>
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
