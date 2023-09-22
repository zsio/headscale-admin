
export const HS_URL = process.env.HEADSCALE_SERVER!;
export const HS_KEY = process.env.HEADSCALE_APIKEY!;


export interface Machine {
  id: string
  machineKey: string
  nodeKey: string
  discoKey: string
  ipAddresses: string[]
  name: string
  user: User
  lastSeen: string
  lastSuccessfulUpdate: string
  expiry: string
  preAuthKey: any
  createdAt: string
  registerMethod: string
  forcedTags: any[]
  invalidTags: any[]
  validTags: any[]
  givenName: string
  online: boolean
}

export interface User {
  id: string
  name: string
  createdAt: string
}



export async function hsGetMachine(id?: string): Promise<{machines: Machine[]}> {
  return await fetch(`${HS_URL}/api/v1/machine`, {
    headers: {
      Authorization: `Bearer ${HS_KEY}`,
    },
  }).then(res=>res.json())
}


