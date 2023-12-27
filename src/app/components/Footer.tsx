import Link from "next/link";

type Props = {
  topic: string;
  page: string | undefined;
  prevPage: string | null;
  nextPage: string | null;
};

export default function Footer({ topic, page, prevPage, nextPage }: Props) {
  if (!prevPage && !nextPage) {
    return;
  }

  const pageNumbers: number[] = [];
  if (prevPage && nextPage) {
    for (let i = Number(prevPage) + 1; i < Number(nextPage); i++) {
      pageNumbers.push(i);
    }
  }
  const prevPageArea = prevPage ? (
    <>
      <Link
        href={`/results/${topic}/${nextPage}`}
        className={!nextPage ? "mx-auto" : ""}
      >
        &lt;&lt;&lt; {!nextPage ? "back" : null}
      </Link>
      {pageNumbers.map((number, i) => {
        page && number === Number(page) ? (
          <span key={i}>{number}</span>
        ) : (
          <Link
            key={i}
            href={`/results/${topic}/${number}`}
            className="underline"
          >
            {number}
          </Link>
        );
      })}
    </>
  ) : null;
  const nextPageArea = nextPage ? (
    <Link
      href={`/results/${topic}/${nextPage}`}
      className={!prevPage ? "mx-auto" : ""}
    >
      {!prevPage ? "more" : null} &gt;&gt;&gt;
    </Link>
  ) : null;

  debugger;

  return (
    <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
      {prevPageArea}
      {nextPageArea}
    </footer>
  );
}
