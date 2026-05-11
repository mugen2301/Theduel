"use client";

import type { Dispatch } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { CustomizerAction } from "@/lib/customizer/reducer";
import type { JerseyCustomizerState, SizeCode } from "@/lib/customizer/types";
import { sizeCodes } from "@/lib/customizer/data";
import { Panel } from "./panel";

type RosterPanelProps = {
  state: JerseyCustomizerState;
  dispatch: Dispatch<CustomizerAction>;
};

export function RosterPanel({ state, dispatch }: RosterPanelProps) {
  return (
    <Panel kicker="Names and numbers" title="Player roster">
      <div className="grid gap-3">
        {state.roster.map((row) => (
          <div key={row.id} className="grid grid-cols-[1fr_72px_74px_36px] gap-2">
            <input
              value={row.playerName}
              onChange={(event) =>
                dispatch({ type: "updateRosterRow", rowId: row.id, patch: { playerName: event.target.value } })
              }
              className="h-10 min-w-0 rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
              placeholder="Name"
            />
            <input
              value={row.playerNumber}
              onChange={(event) =>
                dispatch({ type: "updateRosterRow", rowId: row.id, patch: { playerNumber: event.target.value } })
              }
              className="h-10 rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
              placeholder="No."
            />
            <select
              value={row.size}
              onChange={(event) =>
                dispatch({ type: "updateRosterRow", rowId: row.id, patch: { size: event.target.value as SizeCode } })
              }
              className="h-10 rounded-xl border border-white/10 bg-ink px-2 text-sm font-bold text-bone outline-none focus:border-volt"
            >
              {sizeCodes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => dispatch({ type: "removeRosterRow", rowId: row.id })}
              className="grid h-10 place-items-center rounded-xl border border-white/10 text-steel hover:text-ember"
              aria-label={`Remove ${row.playerName || "player"}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => dispatch({ type: "addRosterRow" })}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-black text-bone hover:bg-white/8"
        >
          <Plus className="h-4 w-4" />
          Add player
        </button>
      </div>
    </Panel>
  );
}
