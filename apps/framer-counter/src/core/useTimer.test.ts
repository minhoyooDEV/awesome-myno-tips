import { renderHook, act } from "@testing-library/react-hooks";
import { useTimer } from "./useTimer";

describe("useTimer", () => {
  let baseTime: Date;

  beforeEach(() => {
    baseTime = new Date("2024-01-01T00:00:00Z"); // 테스트 기준 시간을 설정
    vi.useFakeTimers(); // 타이머 제어를 위해 fake timers 사용
    vi.setSystemTime(baseTime); // 시스템 시간을 기준 시간으로 고정
  });

  afterEach(() => {
    vi.useRealTimers(); // 테스트 후 원래 타이머로 복구
  });

  it("should initialize with the current time in KST", () => {
    const { result } = renderHook(() => useTimer());

    const expectedTime = new Date(baseTime);
    const { years, months, days, hours, minutes, seconds } = result.current;

    expect(years).toBe(expectedTime.getFullYear() - 1970);
    expect(months).toBe(expectedTime.getMonth());
    expect(days).toBe(expectedTime.getDate() - 1);
    expect(hours).toBe(String(expectedTime.getHours()).padStart(2, "0"));
    expect(minutes).toBe(String(expectedTime.getMinutes()).padStart(2, "0"));
    expect(seconds).toBe(String(expectedTime.getSeconds()).padStart(2, "0"));
  });

  it("should increment seconds every second", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      vi.advanceTimersByTime(1000); // 타이머를 1초 앞으로 이동
    });

    const expectedTime = new Date(baseTime);
    expectedTime.setSeconds(expectedTime.getSeconds() + 1); // 1초 증가 후의 시간 계산

    const { seconds } = result.current;

    expect(seconds).toBe(String(expectedTime.getSeconds()).padStart(2, "0")); // 초가 1초 증가했는지 확인
  });

  it("should increment minutes when seconds reach 60", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      vi.advanceTimersByTime(60000); // 타이머를 60초 앞으로 이동
    });

    const expectedTime = new Date(baseTime);
    expectedTime.setMinutes(expectedTime.getMinutes() + 1); // 1분 증가 후의 시간 계산

    const { minutes, seconds } = result.current;

    expect(minutes).toBe(String(expectedTime.getMinutes()).padStart(2, "0"));
    expect(seconds).toBe("00"); // 분 증가 시 초는 00이 되어야 함
  });

  it("should increment hours when minutes reach 60", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      vi.advanceTimersByTime(3600000); // 타이머를 1시간 앞으로 이동
    });

    const expectedTime = new Date(baseTime);
    expectedTime.setHours(expectedTime.getHours() + 1); // 1시간 증가 후의 시간 계산

    const { hours, minutes, seconds } = result.current;

    expect(hours).toBe(String(expectedTime.getHours()).padStart(2, "0"));
    expect(minutes).toBe("00");
    expect(seconds).toBe("00");
  });

  it("should increment days when hours reach 24", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      vi.advanceTimersByTime(86400000); // 타이머를 24시간 앞으로 이동
    });

    const expectedTime = new Date(baseTime);
    expectedTime.setDate(expectedTime.getDate() + 1); // 1일 증가 후의 시간 계산

    const { days, hours, minutes, seconds } = result.current;

    expect(days).toBe(expectedTime.getDate() - 1);
    expect(result.current.days).toBe(expectedTime.getDate() - 1);
    expect(minutes).toBe("00");
    expect(seconds).toBe("00");
  });

  it("should increment months when days reach the end of the month", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      vi.advanceTimersByTime(31 * 86400000); // 타이머를 31일 앞으로 이동
    });

    const expectedTime = new Date(baseTime);
    expectedTime.setMonth(expectedTime.getMonth() + 1); // 1개월 증가 후의 시간 계산

    const { months, days, hours, minutes, seconds } = result.current;

    expect(months).toBe(expectedTime.getMonth());
    expect(days).toBe(expectedTime.getDate() - 1);
    expect(result.current.days).toBe(expectedTime.getDate() - 1);
    expect(minutes).toBe("00");
    expect(seconds).toBe("00");
  });

  // it("should increment years when months reach 12", () => {
  //   const { result } = renderHook(() => useTimer());

  //   act(() => {
  //     vi.advanceTimersByTime(365 * 86400000); // 타이머를 365일 앞으로 이동
  //   });

  //   const expectedTime = new Date(baseTime);
  //   expectedTime.setFullYear(expectedTime.getFullYear() + 1); // 1년 증가 후의 시간 계산

  //   const { years, months, days, hours, minutes, seconds } = result.current;

  //   expect(years).toBe(expectedTime.getFullYear() - 1970);
  //   expect(months).toBe(expectedTime.getMonth());
  //   expect(days).toBe(expectedTime.getDate() - 1);
  //   expect(result.current.days).toBe(expectedTime.getDate() - 1);
  //   expect(minutes).toBe("00");
  //   expect(seconds).toBe("00");
  // });
});
