export async function fetchHN<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HN API error: ${res.status}`);
  }

  return res.json();
}
