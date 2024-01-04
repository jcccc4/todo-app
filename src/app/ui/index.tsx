import prisma from "@/app/lib/prisma";
// (in /pages/index.tsx)

// Alternatively, you can use `getStaticProps`
// in place of `getServerSideProps`.
const Test = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  return (
    <>
      {feed.map((post) => (
        <div key={post.id}>
          {post.content}
        </div>
      ))}
    </>
  )
};

export default Test;
