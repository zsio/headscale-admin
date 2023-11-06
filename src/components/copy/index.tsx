'use client'

import {CopyIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn, copy} from "@/lib/utils"
import React, {useState} from "react";
import toast from "react-hot-toast";

type CopyProps = {
  text: string;
  size?: number;
  children?: React.ReactNode;
} & React.PropsWithChildren<React.SVGAttributes<SVGElement>>;

export default function Copy(props: CopyProps) {
  const {text, size = 16, children, className, ...rest} = props;
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleClick = () => {
    setShowCheckbox(true);

    copy(text).then(r => {
      toast.success("复制成功")
    }).catch(() => {
      toast.error("复制失败")
    });
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