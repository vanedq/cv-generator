import BlockText from "../components/blockTriz";
import Signature from "../components/signature";

interface iHomeProps {
  action: () => void
}

export default function Home({ action }: iHomeProps) {
  return (
    <div className="min-h-screen bg-emerald-800 flex items-center justify-center">
      <div className="text-center">
        <BlockText className='mt-24' prefix={'Gerador de'} blocktext={'CV'} suffix={'ATS friendly'} />
        <button
          onClick={action}
          className="bg-emerald-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto mt-8 shadow-border"
        >
          + Criar Primeiro CV
        </button>
      </div>
      <Signature className="absolute bottom-10 mb-12 md:mb-0" />
    </div>
  )
}