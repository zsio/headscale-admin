import {HsMachine} from "@/lib/hs";

export const HS_URL = process.env.HEADSCALE_SERVER!;
export const HS_KEY = process.env.HEADSCALE_APIKEY!;


export async function hsGetMachine(id?: string): Promise<{machines: HsMachine[]}> {
  return await fetch(`${HS_URL}/api/v1/machine`, {
    headers: {
      Authorization: `Bearer ${HS_KEY}`,
    },
  }).then(res=>res.json())
}


