import {CopyIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn, copy} from "@/lib/utils"
import React, {useState} from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

type CopyProps = {
  text: string;
  size?: number;
} & React.PropsWithChildren<React.SVGAttributes<SVGElement>>;

export default function Copy(props: CopyProps) {
  const {text, size = 16, children, className, ...rest} = props;
  const [showCheckbox, setShowCheckbox] = useState(false);
  const { toast } = useToast()

  const handleClick = () => {
    setShowCheckbox(true);
    toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      ),
    })
    copy(text);
    
    setTimeout(() => {
      setShowCheckbox(false);
    }, 1000);
  };

  return (
    <>
      {showCheckbox ? (
        <CheckIcon className={cn('transition-all cursor-pointer',className)} style={{width: `${size}px`, height: `${size}px`}} {...rest} />
      ) : (
        <CopyIcon className={cn('transition-all cursor-pointer',className)}
          onClick={handleClick}
          style={{width: `${size}px`, height: `${size}px`}}
          {...rest}
        />
      )}
    </>
  );
}