'use client'

import {Button} from "@/components/ui/button";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";

import React, {useCallback, useState} from "react";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import ChangeName from "@/components/change-name/change-name";
import {hsCreateUser, hsRegisterMachine} from "@/lib/hs-api";
import {useHsUsers} from "@/lib/hs-hooks";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const HEADSCALE_SERVER = process.env.NEXT_PUBLIC_HEADSCALE_SERVER;


export default function Page() {
  const [selectUserOpen, setSelectUserOpen] = React.useState(false)
  const [selectUserValue, setSelectUserValue] = React.useState("")
  const [nodeKey, setNodeKey] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const {users, isLoading, mutate} = useHsUsers()

  const router = useRouter()


  const handleRefreshUsers = () => {
    mutate().then()
  };
  
  const goToMachines = useCallback(() => {
    router.push("/admin/machines")
  }, [])

  const handleSubmit = useCallback(() => {
    if (!selectUserValue) {
      toast({
        variant: "destructive",
        description: "请选择用户"
      })
      return;
    }
    if (!nodeKey) {
      toast({
        variant: "destructive",
        description: "请输入nodekey"
      })
      return;
    }
    if (!nodeKey.startsWith("nodekey:")) {
      toast({
        variant: "destructive",
        description: `必须以 "nodekey:" 开头`
      })
      return;
    }
    setSubmitLoading(true)
    hsRegisterMachine(selectUserValue, nodeKey).then(() => {
      toast({
        description: "注册成功，请在客户端查看结果。"
      })
      goToMachines()
    }).catch(e => {
      toast({
        variant: "destructive",
        title: "注册失败",
        description: e?.message
      })
    }).finally(() => {
      setSubmitLoading(false)
    })
  }, [nodeKey, selectUserValue, goToMachines]);

  return (
    <div className="px-2">
      <h1 className="py-4 text-xl font-bold">注册设备</h1>
      <div>
        <h3 className="my-3">1、安装 tailscale 后，使用下面的命令登录：</h3>
        <div className="border p-2 rounded bg-secondary">
          sudo tailscale up --login-server {HEADSCALE_SERVER}
        </div>
        <h3 className="my-3">2、选择注册设备的用户</h3>
        <div className="flex items-center">
          <Popover open={selectUserOpen} onOpenChange={setSelectUserOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={selectUserOpen}
                className="w-[200px] justify-between"
              >
                {selectUserValue
                  ? users.find((user) => user.name === selectUserValue)?.name
                  : "请选择..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
              </Button>

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="搜索..." className="h-9"/>
                <CommandEmpty>无</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.name}
                      onSelect={(currentValue) => {
                        setSelectUserValue(currentValue === selectUserValue ? "" : currentValue)
                        setSelectUserOpen(false)
                      }}
                    >
                      {user.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectUserValue === user.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex text-muted-foreground text-sm pl-4">
            <div>需要新用户？</div>
            <ChangeName title="新用户名" placeholder="英文字母或数字" createNameAPI={hsCreateUser}
                        onClose={() => handleRefreshUsers()}>
              <div className="underline cursor-pointer">创建用户</div>
            </ChangeName>
          </div>

        </div>

        <h3 className="my-3">3、请把终端中打印的 nodekey 输入到下方</h3>
        <Input placeholder="nodekey:xxxxxx" value={nodeKey} onChange={e => setNodeKey(e.target.value)}/>
      </div>
      <div className="mt-8 flex space-x-5">
        <Button variant="outline" onClick={goToMachines}>取 消</Button>
        <Button onClick={() => handleSubmit()} disabled={submitLoading}>注 册</Button>
      </div>
    </div>
  )
}