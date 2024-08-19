import React, {Fragment, useEffect, useState} from "react";
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
import {UpdateIcon} from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge"
import {hsUserRename, hsCreateUser, type HsRes} from "@/lib/hs-api"

interface Props {
  id?: string
  oldName?: string
  onClose?: () => void
  title?: string
  placeholder?: string
  renameAPI?: (oldName: string, newName: string) => Promise<HsRes<{}>>
  createNameAPI?: (name: string) => Promise<HsRes<{}>>
  children?: React.ReactNode
}

export default function ChangeName(
  {
    id,
    oldName,
    onClose,
    children,
    renameAPI,
    createNameAPI,
    title,
    placeholder
  }: Props
) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
  }, [open]);


  const handleRename = () => {
    if (!oldName) return
    setLoading(true)
    renameAPI?.(id ?? oldName, name)
      .then(res => {
        toast.success("success to change")
      })
      .catch(err => {
        toast.error("failed to change")
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
    createNameAPI?.(name)
      .then(res => {
        toast.success("success")
      })
      .catch(err => {
        toast.error("failed")
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
    <AlertDialog open={open} onOpenChange={setOpen}>
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
                  <span>current name:</span>
                  <Badge
                    variant="secondary"
                    className="text-sm">
                    {oldName}
                  </Badge>
                </Fragment>
              ) : (
                <Fragment>
                  <span>{title ?? "please input new name"}</span>
                </Fragment>
              )
            }
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              autoFocus
              value={name}
              className="my-2"
              type="text"
              placeholder={placeholder ?? "please input"}
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
            <span>cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleClick}>
            {loading && <UpdateIcon className="animate-spin"/>}
            <span>confirm</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}