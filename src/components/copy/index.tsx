'use client'

import {CopyIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn, copy} from "@/lib/utils"
import React, {useState} from "react";
import {useToast} from "@/components/ui/use-toast"

type CopyProps = {
  text: string;
  size?: number;
  children?: React.ReactNode;
} & React.PropsWithChildren<React.SVGAttributes<SVGElement>>;

export default function Copy(props: CopyProps) {
  const {text, size = 16, children, className, ...rest} = props;
  const [showCheckbox, setShowCheckbox] = useState(false);
  const {toast} = useToast()

  const handleClick = () => {
    setShowCheckbox(true);
    toast({
      description: "复制成功"
    })
    copy(text);
    setTimeout(() => {
      setShowCheckbox(false);
    }, 1000);
  };

  return (
    <div className={cn("flex items-center gap-x-1 cursor-pointer group", className)}>
      <span>{children}</span>
      {showCheckbox ? (
        <CheckIcon
          className=""
          style={{width: `${size}px`, height: `${size}px`}} {...rest} />
      ) : (
        <CopyIcon
          className="opacity-0 group-hover:opacity-100"
          onClick={handleClick}
          style={{width: `${size}px`, height: `${size}px`}}
          {...rest}
        />
      )}
    </div>
  );
}