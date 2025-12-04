'use client'

import { useRouter } from 'next/navigation'
import { IconContext } from 'react-icons'
import { LuPointer, LuCircleArrowDown } from 'react-icons/lu'
import { TbHandFingerRight } from 'react-icons/tb'
import { motion } from 'motion/react'

export default function HowTo() {
  const router = useRouter()

  return (
    <>
      <section className='h-100dvh'>
        <div className=' flex flex-col justify-center border-2 border-black rounded-3xl p-6 h-[90%]'>
          <motion.p
            initial={{ x: '-85vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='py-12 px-14 bg-amber-400 rounded-3xl block mb-4 w-fit text-xl font-normal tracking-wide leading-8 text-center'
          >
            When starting a book, create a new diary,
          </motion.p>

          <motion.p
            initial={{ x: '-85vw', opacity: 0.3 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='py-12 px-14 bg-amber-400 block rounded-3xl w-fit text-xl font-normal tracking-wide leading-8 text-center'
          >
            and start taking notes immediately!
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 1.6 }}>
            <p className='py-2 px-10 bg-black text-white block rounded-3xl w-fit relative text-2xl rotate-12 mx-auto'>
              Start a new book!
            </p>
            <IconContext.Provider value={{ size: '2rem' }}>
              <div>
                <LuPointer className='relative left-10 top-2 mx-auto' />
              </div>
            </IconContext.Provider>
          </motion.div>
          <IconContext.Provider value={{ size: '4rem' }}>
            <div className='mt-auto animate-bounce' onClick={() => scrollBy({ top: window.innerHeight })}>
              <LuCircleArrowDown className='mx-auto' />
            </div>
          </IconContext.Provider>
        </div>
      </section>
      <section className='h-100dvh'>
        <div className=' flex flex-col border-2 border-black rounded-3xl p-6 h-[90%]'>
          <motion.p
            initial={{ translateX: '-80vw' }}
            whileInView={{ translateX: 0 }}
            transition={{ duration: 1 }}
            className='py-12 px-14 bg-amber-400 block rounded-3xl w-fit text-xl font-normal tracking-wide leading-8 text-center'
          >
            Start each book with two default categories: characters and notes.
          </motion.p>

          <motion.div
            initial='offscreen'
            whileInView='onscreen'
            transition={{ duration: 1, delay: 0.5 }}
            variants={{ offscreen: { translateX: '-80vw', opacity: 0 }, onscreen: { translateX: 0, opacity: 1 } }}
          >
            <div className='p-4 shadow-md my-4'>Characters</div>
            <div className='p-4 shadow-md'>Notes</div>
            <p className='mt-6 bg-amber-400 p-2 text-center rounded-full w-full text-lg'>
              Add more categories as needed.
            </p>
          </motion.div>

          <div className='flex items-center'>
            <motion.div
              initial='initialState'
              whileInView='animateState'
              transition={{ duration: 2, delay: 1.5 }}
              variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 } }}
            >
              <IconContext.Provider value={{ size: '2rem' }}>
                <TbHandFingerRight className='ml-auto mt-6' />
              </IconContext.Provider>
            </motion.div>

            <motion.p
              initial='initialState'
              whileInView='animateState'
              transition={{ duration: 2, delay: 1.5 }}
              variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 } }}
              className='py-2 px-10 bg-black text-white rounded-3xl w-fit mt-8 ml-auto block text-xl'
            >
              Add a new category
            </motion.p>
          </div>
          <IconContext.Provider value={{ size: '4rem' }}>
            <div className='mt-auto animate-bounce' onClick={() => scrollBy({ top: window.innerHeight })}>
              <LuCircleArrowDown className='mx-auto' />
            </div>
          </IconContext.Provider>
        </div>
      </section>
      <section className='h-100dvh'>
        <div className=' flex flex-col border-2 border-black rounded-3xl p-6 h-[90%]'>
          <motion.p
            initial={{ translateX: '-80vw' }}
            whileInView={{ translateX: 0 }}
            transition={{ duration: 1 }}
            className='py-12 px-14 bg-amber-400 block rounded-3xl w-fit text-xl font-normal tracking-wide leading-8 text-center'
          >
            Once you have your categories set up, add fields to each category.
          </motion.p>

          <div className='flex items-center'>
            <motion.div
              initial='initialState'
              whileInView='animateState'
              transition={{ duration: 2, delay: 1.5 }}
              variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 } }}
            >
              <IconContext.Provider value={{ size: '2rem' }}>
                <TbHandFingerRight className='ml-auto mt-6' />
              </IconContext.Provider>
            </motion.div>

            <motion.p
              initial='initialState'
              whileInView='animateState'
              transition={{ duration: 2, delay: 1.5 }}
              variants={{ initialState: { opacity: 0 }, animateState: { opacity: 1 } }}
              className='py-2 px-10 bg-black text-white rounded-3xl w-fit mt-8 ml-auto block text-xl'
            >
              Add a new category
            </motion.p>
          </div>
          <IconContext.Provider value={{ size: '4rem' }}>
            <div className='mt-auto animate-bounce' onClick={() => scrollBy({ top: window.innerHeight })}>
              <LuCircleArrowDown className='mx-auto' />
            </div>
          </IconContext.Provider>
        </div>
      </section>
      {/* <div className='w-[90dvw] h-90dvh bg-[url("/howto.png")] bg-contain bg-no-repeat'></div> */}
      <button
        onClick={() => router.back()}
        className={` text-slate-900 tracking-wide underline underline-offset-2 ml-2 self-center`}
      >
        Go back
      </button>
    </>
  )
}
