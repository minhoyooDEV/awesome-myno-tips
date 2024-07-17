# React Query를 이용한 첫 페이지 렌더링 이벤트 전송 팁

2024.07.18 작성됨

## Intro...

회사에서 기능을 구현할 때, 단순히 한 번의 요청으로 모든 것이 해결되는 경우는 드뭅니다. 대부분의 경우, 여러 데이터를 한 번에 요청하거나 여러 단계의 데이터 요청이 순차적으로 이루어져야 합니다. 예를 들어, A 작업이 완료된 후 B를 실행하고, B와 C가 끝나면 D를 수행하는 식입니다. 그리고 이러한 데이터 요청의 끝에는 '어떤 것'을 해야 하기도 하죠.

저에게는 이러한 과정의 끝으로 사용자 로그인 후 필요한 데이터를 불러오고 관련 이벤트를 전송해 달라는 요구사항을 많이 받았습니다. 다만, 요청해야 할 데이터가 한두 개도 아니고, 같이 전송해야 하는 데이터를 가져오기 위해 구조적으로 애매한 경우도 있어 비교적 신경이 많이 쓰이는 작업이었습니다.

결국 몇 번의 시도 끝에 React Query를 이용하여 이러한 요구사항을 보다 손쉽게 처리할 수 있는 방법을 찾았습니다. React Query를 활용하여 이런 상황에서 빛을 발할 수 있는 간단한 방법을 소개해드리겠습니다.

---

### 1. useState를 이용한 접근방법

먼저, 전통적인 useState를 사용해 첫 페이지 렌더링 후 이벤트를 전송하는 방법을 살펴보겠습니다. React를 이용한 아주 간단한 방법입니다.

```jsx
import React, { useState, useEffect } from "react";

const fetchPosts = async ({ postId }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.json();
};

function UsingUseStatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data1, setData1] = (useState < { id: number }) | (null > null);
  const [data2, setData2] = (useState < { id: number }) | (null > null);
  const [data3, setData3] = (useState < { id: number }) | (null > null);

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
    if (isAuthenticated) {
      fetchPosts({ postId: 10 }).then(setData1);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!data1?.id) return;

    fetchPosts({ postId: 20 }).then((response) => {
      setData2(response);
    });
  }, [data1?.id]);

  useEffect(() => {
    if (!data2?.id) return;

    fetchPosts({ postId: 30 }).then((response) => {
      setData3(response);
    });
  }, [data2?.id]);

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

export default UsingUseStatePage;
```

#### 장점:

- 간단한 구조로 쉽게 이해할 수 있습니다.

#### 단점:

- 데이터가 많아질수록 상태를 관리하는 코드가 복잡해지고 번거로워집니다.

#### 종합:

useState를 이용한 접근법은 단순하고 직관적이지만, 데이터가 많아질수록 코드가 복잡해지고 유지보수가 어려워집니다. 이제 이러한 문제를 해결할 수 있는 React Query의 접근 방법을 소개하겠습니다.

---

### 2. React Query의 Fetching 상태를 이용한 접근방법

React Query의 fetching 상태를 이용해 데이터 로딩 상태를 관리하고 이벤트를 전송하는 방법입니다. 이 방법을 통해 상태 관리의 복잡성을 줄이고, 코드의 간결성을 높일 수 있습니다.

#### 예제 코드:

```tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const FirstPage = () => {
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
};

export default FirstPage;
```

#### 장점:

- React Query의 기능을 활용하여 데이터 로딩 상태를 쉽게 관리할 수 있습니다.
- 코드가 간결하고 가독성이 높아집니다.
- Query를 사용할 때 접근할 수 있는 직관적인 방법입니다.
- 어떤 쿼리를 처리하는지 세부적으로 컨트롤할 수 있습니다.

#### 단점:

- React Query를 처음 사용하는 경우 학습 곡선이 있을 수 있습니다.
- Query가 늘어날수록 확인해야 하는 Query의 fetching 상태가 많아집니다. 여러 컴포넌트에 Query가 나눠 구성되어 있는 경우 쿼리 키를 관리해야 하므로 상당히 번거롭습니다.

#### 종합:

React Query의 fetching 상태를 활용하면 데이터 로딩 상태를 쉽게 관리하고, 이벤트 전송을 간편하게 처리할 수 있습니다. 이제 이 방법을 한층 더 발전시켜 보겠습니다.

---

### 3. React Query의 useIsFetching을 이용한 접근방법

React Query의 useIsFetching 훅을 이용해 데이터 로딩 상태를 관리하고 이벤트를 전송하는 방법입니다. 이 접근법은 더욱 직관적이며 효율적입니다.

#### 예제 코드:

```tsx
import React, { useEffect, useState } from "react";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import axios from "axios";

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

const FirstPage = () => {
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
};

export default FirstPage;
```

#### 장점:

- 해당 페이지가 로드된 이후 query로 발생되는 데이터가 모두 fetching이 끝난 후 처리를 명확히 할 수 있습니다.
- fetching 상태에 대한 코드가 단순해지기 때문에 코드 관리가 더 쉽습니다.

#### 단점:

- 모든 query에 대한 fetching을 확인하기 때문에 불필요한 query의 로드가 끝나는 것을 기다려야 합니다.
- 처음 페이지 구동 시 React Query의 fetching 상태를 보완하기 위한 코드가 필요합니다.

#### 종합:

React Query의 useIsFetching 훅을 사용하면 모든 데이터가 로드된 후 이벤트를 전송하는 논리를 명확하게 작성할 수 있습니다. 코드가 더 직관적이고 명확하지만, React Query의 고급 기능을 익히는 데 시간이 걸릴 수 있습니다. 또한, 초기 fetching 상태를 보완하기 위한 코드가 필요할 수 있습니다.

---

### 4. MyNo's Tip

마지막으로, useIsFetching 훅의 filter 함수를 사용하는 방법을 소개합니다. 이 방법을 통해 특정 쿼리에 대한 fetching 상태를 세부적으로 관리할 수 있습니다.

#### 예제 코드:

```tsx
import React, { useEffect, useState } from "react";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import axios from "axios";

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

function FirstPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const initialRenderComplete = useInitialRenderComplete();

  const { data: data1 } = useQuery<Resource>({
    queryKey: ["resource", 10],
    queryFn: () => fetchResource(10),
  });
  const { data: data2 } = useQuery<Resource>({
    queryKey: ["resource", 20],
    queryFn: () => fetchResource(20),
  });
  const { data: data3 } = useQuery<Resource>({
    queryKey: ["other-resource", 30],
    queryFn: () => fetchResource(30),
  });

  const isFetching = useIsFetching({
    queryKey: ["resource"],
  });

  useEffect(() => {
    const authenticate = async () => {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1000);
    };

    authenticate();
  }, []);

  useEffect(() => {
    if (initialRenderComplete && isFetching === 0) {
      sendEvent();
    }
  }, [initialRenderComplete, isFetching]);

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

export default FirstPage;
```

#### 장점:
* 특정 쿼리 키를 기준으로 fetching 상태를 세부적으로 관리할 수 있습니다.
* 여러 쿼리가 있을 때도 원하는 상태를 명확하게 파악하고 처리할 수 있습니다.
* 코드가 더 직관적이고 명확해집니다.

#### 단점:
* 필터링을 통해 fetching 상태를 관리하는 로직이 추가되므로 코드 복잡성이 약간 증가할 수 있습니다.

#### 종합:
useIsFetching 훅의 filter 함수를 활용하면 특정 쿼리 키를 기준으로 fetching 상태를 세부적으로 관리할 수 있어, 여러 쿼리가 있을 때도 원하는 상태를 명확하게 파악하고 처리할 수 있습니다. 이 방법은 코드가 더 직관적이고 명확하지만, 필터링 로직이 추가되면서 코드 복잡성이 약간 증가할 수 있습니다. React Query의 고급 기능을 익히는 데 시간이 걸릴 수 있지만, 프로젝트에 맞는 접근 방법을 선택해 사용한다면 보다 효율적으로 데이터를 관리하고 이벤트를 전송할 수 있습니다.

---

## 결론

이번 글에서는 React를 사용하여 첫 페이지 렌더링 후 이벤트를 전송하는 다양한 접근 방법을 살펴보았습니다. 처음에는 useState를 이용한 전통적인 방법을 소개했는데, 이는 간단하지만 데이터가 많아질수록 코드가 복잡해지는 단점이 있습니다.

이어 React Query의 fetching 상태를 활용한 방법을 다루었습니다. 이 접근법은 상태 관리의 복잡성을 줄이고, 코드의 가독성을 높일 수 있다는 장점이 있지만, 학습 곡선이 있을 수 있고 쿼리 키를 관리하는 데 번거로움이 따를 수 있습니다.

마지막으로, useIsFetching 훅의 filter 함수를 사용하여 특정 쿼리 키를 기준으로 fetching 상태를 세부적으로 관리하는 방법을 소개했습니다. 이 방법은 여러 쿼리가 있을 때도 원하는 상태를 명확하게 파악하고 처리할 수 있습니다. 다만, 필터링 로직이 추가되면서 코드의 복잡성이 약간 증가할 수 있으며, React Query의 고급 기능을 익히는 데 시간이 걸릴 수 있습니다.

React Query를 활용하여 데이터 로딩 상태를 효율적으로 관리하고 이벤트를 전송하는 다양한 방법을 살펴보았습니다. 각각의 방법은 상황에 따라 유용할 수 있으니, 프로젝트에 맞는 접근 방법을 선택해 사용하시기 바랍니다.

React Query의 useIsFetching 훅에 대한 자세한 내용은 [공식 문서](https://tanstack.com/query/v5/docs/framework/react/reference/useIsFetching)에서 확인할 수 있습니다.

더 많은 Pro팁과 예제를 원하시면 다른 글도 읽어보시기 바랍니다. React와 Typescript의 관련된 다양한 주제를 다루며, 더 나은 개발 경험을 제공할 수 있도록 노력하겠습니다.