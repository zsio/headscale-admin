import {useState} from "react";
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
import {hsUserRename} from "@/lib/hs-api"

interface Props {
  oldName: string
  onClose?: () => void
}

export default function UsernameEdit({oldName, onClose}: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const {toast} = useToast()

  const handleSubmit = () => {
    setLoading(true)
    hsUserRename(oldName, name)
      .then(res => {
        console.log(res);
        toast({
          duration: 1000,
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
        setName("")
        setOpen(false)
        setLoading(false)
        onClose?.()
      })
  }
  
  

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <InputIcon className="h-4 w-4"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span>当前用户名：</span>
            <Badge
              variant="secondary"
              className="text-sm">
              {oldName}
            </Badge>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              className="my-2"
              autoFocus
              placeholder="请输入新的用户名"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
            <span>取 消</span>
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleSubmit}>
            {loading && <UpdateIcon className="animate-spin"/>}
            <span>确 定</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}