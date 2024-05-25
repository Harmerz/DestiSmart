import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export default function ChatPage() {
  const messsages = [
    {
      _id: '6652030eed227e4e1c644d43',
      conversationID: '664a27622c3d1f4aba32697a',
      senderID: '664a253c98f64cf2e5562339',
      prompt:
        'Saya ingin berlibur ke Bandung, Coba berikan rekomendasi tempat yang bisa saya kunjungi. Jwaban kamu: Tentu, berikut adalah beberapa rekomendasi tempat yang bisa Anda kunjungi di Bandung:\n1. Kawah Putih - Danau vulkanik dengan air berwarna putih kehijauan yang terletak di Ciwidey.\n2. Tangkuban Perahu - Gunung berapi yang masih aktif dengan pemandangan kawah yang indah.\n3. Dusun Bambu - Tempat wisata yang cocok untuk bersantai dan menikmati alam dengan berbagai fasilitas seperti restoran dan playground.\n4. Floating Market Lembang - Pasar terapung yang menawarkan berbagai kuliner khas Sunda dan spot foto yang menarik.\n5. Farmhouse Susu Lembang - Kawasan wisata dengan bangunan ala Eropa, peternakan mini, dan spot foto yang instagramable.\nSemoga rekomendasi ini dapat membantu Anda menikmati liburan di Bandung!. Bagaimana cara saya kesana dari Yogyakarta?',
      response:
        'Anda dapat menuju Bandung dari Yogyakarta dengan menggunakan transportasi udara, darat, atau kereta api. Jika Anda ingin menggunakan transportasi udara, Anda dapat memesan tiket pesawat dari Bandara Adisutjipto Yogyakarta ke Bandara Internasional Husein Sastranegara Bandung. Jika Anda memilih transportasi darat, Anda dapat menggunakan bus atau travel yang melayani rute Yogyakarta-Bandung. Sedangkan jika Anda ingin menggunakan kereta api, Anda bisa naik kereta eksekutif atau bisnis dari Stasiun Tugu Yogyakarta menuju Stasiun Bandung. Pastikan untuk merencanakan perjalanan Anda dengan baik agar dapat menikmati liburan di Bandung dengan nyaman. Semoga perjalanan Anda lancar dan menyenangkan!',
      createdAt: '2024-05-25T15:26:10.178Z',
      updatedAt: '2024-05-25T15:26:10.178Z',
      __v: 0,
    },
    {
      _id: '665202aaed227e4e1c644d3f',
      conversationID: '664a27622c3d1f4aba32697a',
      senderID: '664a253c98f64cf2e5562339',
      prompt:
        'Saya ingin berlibur ke Bandung, Coba berikan rekomendasi tempat yang bisa saya kunjungi',
      response:
        'Tentu, berikut adalah beberapa rekomendasi tempat yang bisa Anda kunjungi di Bandung:\n1. Kawah Putih - Danau vulkanik dengan air berwarna putih kehijauan yang terletak di Ciwidey.\n2. Tangkuban Perahu - Gunung berapi yang masih aktif dengan pemandangan kawah yang indah.\n3. Dusun Bambu - Tempat wisata yang cocok untuk bersantai dan menikmati alam dengan berbagai fasilitas seperti restoran dan playground.\n4. Floating Market Lembang - Pasar terapung yang menawarkan berbagai kuliner khas Sunda dan spot foto yang menarik.\n5. Farmhouse Susu Lembang - Kawasan wisata dengan bangunan ala Eropa, peternakan mini, dan spot foto yang instagramable.\nSemoga rekomendasi ini dapat membantu Anda menikmati liburan di Bandung!',
      createdAt: '2024-05-25T15:24:29.516Z',
      updatedAt: '2024-05-25T15:24:29.516Z',
      __v: 0,
    },
    {
      _id: '6651fec0a28d8da5ba301d72',
      conversationID: '664a27622c3d1f4aba32697a',
      senderID: '664a253c98f64cf2e5562339',
      prompt:
        'Saya ingin berlibur ke Bandung, Coba berikan rekomendasi tempat yang bisa saya kunjungi',
      response:
        'Tentu, berlibur ke Bandung adalah pilihan yang bagus! Berikut adalah beberapa rekomendasi tempat yang bisa Anda kunjungi di Bandung:\n1. Kawah Putih - Danau vulkanik dengan air berwarna putih kehijauan.\n2. Tangkuban Perahu - Gunung berapi yang masih aktif dengan pemandangan yang indah.\n3. Farmhouse Susu Lembang - Tempat wisata dengan arsitektur ala Belanda dan peternakan mini.\n4. Dusun Bambu - Tempat rekreasi keluarga dengan pemandangan alam yang indah.\n5. Gedung Sate - Bangunan bersejarah dengan arsitektur khas Indonesia.\n6. Jalan Braga - Kawasan bersejarah dengan bangunan-bangunan kuno dan tempat makan yang menarik.\nSemoga informasi ini membantu, selamat berlibur!',
      createdAt: '2024-05-25T15:07:46.980Z',
      updatedAt: '2024-05-25T15:07:46.980Z',
      __v: 0,
    },
    {
      _id: '665139614e5ae330e47eca7b',
      conversationID: '664a27622c3d1f4aba32697a',
      senderID: '664a253c98f64cf2e5562339',
      prompt: 'Apa wisata yang menjadi andalan saat berlibur ke Bandung',
      response:
        "Bandung memiliki beragam tempat wisata yang menjadi andalannya, salah satunya adalah:\n\n1. Kawasan Dago: Tempat ini terkenal dengan pemandangan alam yang indah, terdapat banyak villa dan hotel berkelas di sekitar area ini.\n2. Kawasan Lembang: Terdapat berbagai objek wisata menarik seperti Farmhouse Susu Lembang, Floating Market Lembang, dan The Lodge Maribaya.\n3. Kawasan Ciwidey: Terkenal dengan keindahan alamnya, seperti Kawah Putih, Situ Patenggang, dan Ranca Upas.\n4. Kawasan Puncak: Terdapat banyak villa dan resort mewah dengan pemandangan pegunungan yang menakjubkan.\n5. Kawasan Bandung Utara: Menawarkan pesona alam yang indah seperti Tangkuban Perahu, Maribaya Glamping Lakeside, dan De'Ranch.\n\nSelain itu, Bandung juga terkenal dengan kuliner khasnya seperti makanan tradisional Sunda, kue basah, dan kopi khas Bandung yang dapat menjadi daya tarik tersendiri bagi wisatawan.",
      createdAt: '2024-05-25T01:05:41.338Z',
      updatedAt: '2024-05-25T01:05:41.338Z',
      __v: 0,
    },
    {
      _id: '665135088f82fa568c3cb289',
      conversationID: '664a27622c3d1f4aba32697a',
      senderID: '664a253c98f64cf2e5562339',
      prompt: 'ceritakan tentang Universitas Gadjah Mada',
      response:
        'Universitas Gadjah Mada (UGM) merupakan salah satu perguruan tinggi terkemuka di Indonesia yang terletak di Yogyakarta. Didirikan pada tahun 1949, UGM terkenal dengan reputasi akademiknya yang kuat di berbagai bidang studi. Kampus UGM memiliki arsitektur yang indah dan terdiri dari berbagai gedung bersejarah.\n\nUGM menawarkan berbagai program studi mulai dari Sarjana hingga Doktoral di berbagai disiplin ilmu, seperti ilmu sosial, teknik, kedokteran, dan lain-lain. Selain itu, UGM juga aktif dalam penelitian dan pengabdian masyarakat.\n\nSelain sebagai institusi pendidikan, UGM juga sering menjadi tujuan wisata bagi para pengunjung yang ingin melihat keindahan kampus serta mengikuti tur yang diselenggarakan oleh pihak universitas. Wisatawan juga dapat menikmati berbagai acara budaya dan seni yang sering diadakan di UGM.',
      createdAt: '2024-05-25T00:47:08.473Z',
      updatedAt: '2024-05-25T00:47:08.473Z',
      __v: 0,
    },
  ]
  return (
    <div className="text-md relative flex h-screen w-full flex-col bg-background pb-14">
      <div className="flex flex-row items-center gap-2 rounded-b-lg border-b border-white bg-background px-2 py-4">
        <Link href="/home">
          <FaArrowLeft className="h-5 w-5 text-white" />
        </Link>
        Tempat Wisata
      </div>
      <div className="flex h-full flex-col gap-4 overflow-y-auto px-3">
        {messsages?.map((e) => (
          <div key={e} className="flex flex-col gap-2">
            <div className="ml-auto flex h-auto w-fit rounded-[20px] bg-slate-800 px-3 py-2">
              {e?.prompt}
            </div>
            <div key={e?._id} className="flex flex-row gap-3">
              <div className="relative flex aspect-square h-[27px] w-[37px] ">
                <Image src="/assets/chat.png" fill alt="logo-bot" />
              </div>
              <div className="w-4/5">{e?.response}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Chat */}
      <div className="absolute bottom-3 w-full bg-transparent">
        <div className="relative flex w-full flex-row gap-2 bg-transparent px-3">
          <input className="z-0 flex flex-1 rounded-full border bg-transparent px-3 py-2" />
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2"
          >
            <FaArrowUp className="text-background" />
          </button>
        </div>
      </div>
    </div>
  )
}
