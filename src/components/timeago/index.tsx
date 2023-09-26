import {format} from 'timeago.js';
import dayjs from 'dayjs'
import React, {useEffect, useState} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {cn} from "@/lib/utils";

export default function TimeAgo(props: { time: string, text?: string } & React.HTMLProps<HTMLSpanElement>) {
  const {time, text, className, ...p} = props;
  const [timeAgoText, setTimeAgoText] = useState("Null")
  const [timeFormatText, setTimeFormatText] = useState("")

  useEffect(() => {
    if (!dayjs(time).isValid()) return
    setTimeAgoText(format(time, 'zh_CN'))
    setTimeFormatText(dayjs(time).format("YYYY-MM-DD HH:mm:ss"))
    const timer = setInterval(() => {
      setTimeAgoText(format(time, 'zh_CN'))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [time])

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <span className={cn("underline decoration-dotted", className)} {...p}>
              {text || timeAgoText}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{timeFormatText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </>
  )
}