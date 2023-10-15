const CLIENT_API_BASE_URL = "/api/headscale/v1";

export interface BaseHsRes {
  code?: number;
  message?: string;
  details?: any;
}

export type HsRes<T> = BaseHsRes & T

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

export function hsDeleteUserByName(name: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/user/${name}`, {
    method: "DELETE"
  });
}

export function hsMachineRename(machineId: string, newName: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/machine/${machineId}/rename/${newName}`, {
    method: "POST",
  });
}

export function hsDeleteMachineById(name: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/machine/${name}`, {
    method: "DELETE"
  });
}

export function hsRegisterMachine(user: string, key: string) {
  return fetchAndHandle<{}>(`${CLIENT_API_BASE_URL}/machine/register?user=${user}&key=${key}`, {
    method: "POST"
  });
}