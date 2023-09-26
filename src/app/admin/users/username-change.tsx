import React, {Fragment, useState} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {InputIcon, UpdateIcon} from "@radix-ui/react-icons";
import {useToast} from "@/components/ui/use-toast"
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge"
import {hsUserRename, hsCreateUser} from "@/lib/hs-api"

interface Props {
  oldName?: string
  onClose?: () => void
  children?: React.ReactNode
}

export default function UsernameChange({oldName, onClose, children}: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const {toast} = useToast()

  const handleRename = () => {
    if (!oldName) return
    setLoading(true)
    hsUserRename(oldName, name)
      .then(res => {
        toast({
          duration: 500,
          description: "修改成功",
        })
      })
      .catch(err => {
        toast({
          duration: 3000,
          title: "修改失败",
          variant: "destructive",
          description: err.message,
        })
      })
      .finally(() => {
        onClose?.()
        setName("")
        setOpen(false)
        setLoading(false)
      })
  }
  const handleCreate = () => {
    setLoading(true)
    hsCreateUser(name)
      .then(res => {
        toast({
          duration: 500,
          description: "创建成功",
        })
      })
      .catch(err => {
        toast({
          duration: 3000,
          title: "创建失败",
          variant: "destructive",
          description: err.message,
        })
      })
      .finally(() => {
        onClose?.()
        setName("")
        setOpen(false)
        setLoading(false)
      })
  }

  const handleClick = () => {
    oldName ? handleRename() : handleCreate()
  }


  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <div onClick={() => setOpen(true)}>
          {
            children
          }
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {
              oldName ? (
                <Fragment>
                  <span>当前用户名：</span>
                  <Badge
                    variant="secondary"
                    className="text-sm">
                    {oldName}
                  </Badge>
                </Fragment>
              ) : (
                <Fragment>
                  <span>请输入新的用户名：</span>
                </Fragment>
              )
            }
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              autoFocus
              value={name}
              className="my-2"
              placeholder="请输入新的用户名"
              onChange={e => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick()
                }
                e.stopPropagation()
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
            <span>取 消</span>
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleClick}>
            {loading && <UpdateIcon className="animate-spin"/>}
            <span>确 定</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}