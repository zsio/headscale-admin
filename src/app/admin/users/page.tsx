'use client'

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
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useHsUsers} from "@/lib/hs-hooks";
import TimeAgo from "@/components/timeago";
import Copy from "@/components/copy";
import {Button} from "@/components/ui/button";
import {InputIcon, TrashIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import ChangeName from "../../../components/change-name/change-name";
import React from "react";
import {hsDeleteUserByName, hsUserRename, hsCreateUser } from "@/lib/hs-api";
import {useToast} from "@/components/ui/use-toast";


export default function Page() {

  const {data, error, isLoading, mutate} = useHsUsers()
  const {toast} = useToast()
  const handleRefresh = () => {
    mutate().then()
  };

  const handleDelete = (user: string) => {
    hsDeleteUserByName(user).then(() => {
      toast({
        duration: 500,
        description: "删除成功",
      })
    }).catch((err) => {
      toast({
        duration: 3000,
        title: "删除失败",
        description: err
      })
    }).finally(handleRefresh)
  }


  return (
    <>
      <div className="flex justify-between">
        <div/>
        <ChangeName createNameAPI={hsCreateUser} onClose={() => handleRefresh()}>
          <Button variant="outline" size="default">创建用户</Button>
        </ChangeName>

      </div>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>加入时间</TableHead>
            <TableHead className="w-20"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell><Copy text={user.id}>{user.id}</Copy></TableCell>
              <TableCell>
                <Copy text={user.name}>{user.name}</Copy>
              </TableCell>
              <TableCell>
                <TimeAgo time={user.createdAt}/>
              </TableCell>
              <TableCell>
                <div className="flex h-5 items-center space-x-2 text-sm">
                  <ChangeName renameAPI={hsUserRename} oldName={user.name} onClose={() => handleRefresh()}>
                    <Button variant="ghost" size="icon">
                      <InputIcon className="h-4 w-4"/>
                    </Button>
                  </ChangeName>
                  <Separator orientation="vertical" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4"/>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确定要删除此用户吗？</AlertDialogTitle>
                        <AlertDialogDescription/>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取 消</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(user.name)}>确 定</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
