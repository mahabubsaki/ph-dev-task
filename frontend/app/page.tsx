import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat bg-top flex justify-center items-center px-5">
      <section className="w-[90%]  max-w-[700px] p-5 rounded-md mx-auto bg-black text-white">
        <h1 className="text-2xl text-center font-bold">Join Now</h1>
      </section>
    </main>
  );
}
