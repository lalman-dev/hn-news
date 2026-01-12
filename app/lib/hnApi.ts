export async function fetchHN<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}
