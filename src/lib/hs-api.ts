const CLIENT_API_BASE_URL = "/api/headscale/v1";

interface BaseHsRes {
  code?: number;
  message?: string;
  details?: any;
}

type HsRes<T> = BaseHsRes & T

async function fetchAndHandle<T>(url: string, options: RequestInit): Promise<HsRes<T>> {
  try {
    const res = await fetch(url, options);
    const body: HsRes<T> = await res.json();
    if (body.message) {
      throw new Error(body.message);
    }
    return body;
  } catch (error) {
    // 可以后期加上日志
    throw error;
  }
}

export function hsUserRename(oldName: string, newName: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/user/${oldName}/rename/${newName}`, {
    method: "POST",
  });
}

export function hsCreateUser(name: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/user`, {
    method: "POST",
    body: JSON.stringify({
      name
    })
  });
}

export function hsDeleteName(name: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/user/${name}`, {
    method: "DELETE"
  });
}
