"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
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
    </main>
  );
}
