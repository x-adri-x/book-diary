type TitleProps = { text: string }

export default function Title({ text }: TitleProps) {
  return <h1 className={`text-2xl text-center mb-6 mt-2 font-bold uppercase tracking-wider`}>{text}</h1>
}
