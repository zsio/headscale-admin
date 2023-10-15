'use client'

interface Props {
  params: {
    id: string
  }
}

export default function Page(props: Props) {

  console.log(props)

  return (
    <>
      当前机器：{JSON.stringify(props.params)}
    </>
  )
}