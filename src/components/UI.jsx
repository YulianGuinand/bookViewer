import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = Array.from({ length: 61 }, (_, i) => `${i + 1}`);

export const pageAtom = atom(0);
export const cameraPositionAtom = atom([0, 0, 3]);
export const pages = [
  {
    front: "cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "back",
});

const chapters = [
  { title: "Premiere de Couverture", page: 0 },
  { title: "Introduction", page: 3 },
  { title: "Préhistoire", page: 4 },
  { title: "Antiquité", page: 8 },
  { title: "Amér. Précolombienne", page: 11 },
  { title: "Asie Médiévale", page: 14 },
  { title: "Europe Moderne", page: 18 },
  { title: "Époque Contemp.", page: 23 },
  { title: "4eme de Couverture", page: pages.length },
];

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [cameraPosition, setCameraPosition] = useAtom(cameraPositionAtom);
  const [sidebarOpened, setSidebarOpened] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <button
          onClick={() => setSidebarOpened(!sidebarOpened)}
          className="pointer-events-auto fixed top-4 left-4 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
          <button
            className="hover:bg-white/20 transition-colors p-4 rounded-full bg-black/30 text-white backdrop-blur-md"
            onClick={() => setCameraPosition([0, 0, 1.5])}
          >
            Zoom avant
          </button>
          <button
            className="hover:bg-white/20 transition-colors p-4 rounded-full bg-black/30 text-white backdrop-blur-md"
            onClick={() => setCameraPosition([-1.5, 0, 3])}
          >
            Gauche
          </button>
          <button
            className="hover:bg-white/20 transition-colors p-4 rounded-full bg-black/30 text-white backdrop-blur-md"
            onClick={() => setCameraPosition([0, 0, 3])}
          >
            Devant
          </button>
          <button
            className="hover:bg-white/20 transition-colors p-4 rounded-full bg-black/30 text-white backdrop-blur-md"
            onClick={() => setCameraPosition([1.5, 0, 3])}
          >
            Droite
          </button>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto">
          <button
            className="hover:bg-white/20 transition-colors px-8 py-4 rounded-full bg-black/30 text-white backdrop-blur-md font-bold text-lg border border-white/10"
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
          >
            Précédent
          </button>
          <button
            className="hover:bg-white/20 transition-colors px-8 py-4 rounded-full bg-black/30 text-white backdrop-blur-md font-bold text-lg border border-white/10"
            onClick={() =>
              setPage(page < pages.length ? page + 1 : pages.length)
            }
          >
            Suivant
          </button>
        </div>

        <div
          className={`fixed left-0 top-0 h-full w-64 bg-black/80 backdrop-blur-md flex flex-col pointer-events-auto overflow-y-auto transition-transform duration-500 z-40 ${
            sidebarOpened ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <h2 className="text-white text-2xl font-bold mb-6">Chapitres</h2>
            <div className="flex flex-col gap-2">
              {[...chapters].map((chapter, index) => (
                <button
                  key={index}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    page === chapter.page
                      ? "bg-white text-black font-bold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => {
                    setPage(chapter.page);
                    setSidebarOpened(false);
                  }}
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
