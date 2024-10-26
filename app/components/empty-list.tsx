import { FaceSmileIcon } from '@heroicons/react/24/outline'

type EmptyListProps = {
  name: string
}

export default function EmptyList({ name }: EmptyListProps) {
  return (
    <div className='mt-8 flex flex-col items-center'>
      <p>{`Looks like you're just starting. Let's add your first ${name} now!`}</p>
      <FaceSmileIcon className='w-8 h-8' />
    </div>
  )
}