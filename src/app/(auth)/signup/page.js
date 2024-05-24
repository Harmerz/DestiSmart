import Image from 'next/image'

export default function SignInHome() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-background px-16">
      <div className="relative aspect-square w-4/5">
        <Image src="/assets/DestiSmart.png" fill alt="Logo" />
      </div>
      <h1 className="mt-4 text-4xl font-medium text-main">DestiSmart</h1>
      <p className="mt-10 text-text">
        Fun fact !!
        <br />
        Menurut BPS, Indonesia memiliki 2930 usaha objek daya tarik wisata (ODTW) pada 2022
      </p>
      <div className="mt-20 flex w-full flex-col gap-5">
        <input
          placeholder="Full Name"
          type="nama"
          className="w-full rounded-full border bg-transparent px-3 py-2"
        />
        <input
          placeholder="email"
          type="email"
          className="w-full rounded-full border bg-transparent px-3 py-2"
        />
        <input
          placeholder="password"
          type="password"
          className="w-full rounded-full border bg-transparent px-3 py-2"
        />
        <input
          placeholder="ulangi password"
          type="password"
          className="w-full rounded-full border bg-transparent px-3 py-2"
        />
        <button className="rounded-full bg-main px-3 py-2 text-xl text-white" type="buttton">
          Masuk
        </button>
        <p className="text-md -mt-3">
          Sudah Punya Akun? <span className="text-main">Masuk di sini</span>
        </p>
      </div>
    </div>
  )
}
