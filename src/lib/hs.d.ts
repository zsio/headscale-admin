
export interface HsMachine {
  id: string
  machineKey: string
  nodeKey: string
  discoKey: string
  ipAddresses: string[]
  name: string
  user: HsUser
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

export interface HsUser {
  id: string
  name: string
  createdAt: string
}
