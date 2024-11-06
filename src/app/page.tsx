"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const posibleClasses = ["bg-red-400", "bg-green-500"] as const;

export default function Home() {
  const [newClass, setNewClass] = useState("");
  const { data } = useSession();

  const logData = () => {
    console.log(data);
  };
  return (
    <main className="mx-auto px-2">
      <article>
        <h2>Whats up?</h2>
        <p className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
          molestiae odit sapiente ducimus dignissimos! Sed odio iusto aperiam
          ratione aspernatur assumenda illum nesciunt maxime culpa. Maxime alias
          <br />
          voluptate facere error! Architecto sint dolores dolorem, perferendis
          accusamus unde ea repudiandae delectus facilis
          <br /> quos asperiores, quibusdam optio mollitia impedit explicabo
          corporis itaque deserunt officiis molestiae veritatis, nemo aspernatur
          consequuntur. Quae, reiciendis et.
        </p>
      </article>
      <button onClick={logData}>clicky</button>
      <input
        type="text"
        name=""
        id=""
        value={newClass}
        className="h-6 w-24 text-slate-900"
        onChange={(e) => setNewClass(e.target.value)}
      />
      <div
        className={`bg-green-400 w-24 h-24 transition-all ${newClass}`}
      ></div>
    </main>
  );
}
