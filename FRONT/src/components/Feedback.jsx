import iconFeed from '../assets/iconFeed.svg'

function Feedback() {
  return (
    <div className='flex flex-row w-full gap-5 font-secondary'>
      <div className='flex flex-col w-[33%] bg-blue'>
        <h1 className='text-black/70 font-medium text-xl'>A realidade sobre nossas entregas</h1>
        <p>Felizmente, com todo o esforço da nossa trajetória, recebemos diversos feedbacks dos clientes — e achamos importante compartilhá-los.</p>
        <img src={iconFeed} alt="" />
      </div>
      <div className='flex flex-col w-[33%] bg-blue'>
        a
      </div>
      <div className='flex flex-col w-[33%] bg-blue'>
        a
      </div>
    </div>
  )
}

export default Feedback
