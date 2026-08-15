import { ChevronRight } from "lucide-react";
type RecommendationCardProps = {
  rank: number;
  name: string;
  latin: string;
  note: string;
  score: number;
  onClick?: () => void;
};

function rankColor(rank: number) {
  if (rank === 1) return "bg-rank1";
  if (rank === 2) return "bg-rank2";
  if (rank === 3) return "bg-rank3";
  if (rank === 4) return "bg-rank4";
  return "bg-rank5";
}
export default function RecommendationCard({
  rank,
  name,
  latin,
  note,
  score,
  onClick,
}: RecommendationCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:scale-[1.01]"
    >
      <span
        className={`flex w-12 shrink-0 items-center justify-center ${rankColor(rank)} font-display text-lg font-bold text-forest-dark`}
      >
        {rank}
      </span>

      <span className="flex-1 p-3 text-left">
        <span className="flex items-start justify-between gap-2">
          <span className="font-display text-sm font-bold text-forest-dark">
            {name}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <span className="font-display text-base font-bold text-forest-dark">
              {score}%
            </span>
            <ChevronRight className="h-4 w-4 text-forest-dark/50" />
          </span>
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-forest-dark/60">
          {note}
        </span>
        <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-forest-dark/15">
          <span
            className="block h-full rounded-full bg-forest"
            style={{ width: `${score}%` }}
          />
        </span>
      </span>
    </button>
  );
}