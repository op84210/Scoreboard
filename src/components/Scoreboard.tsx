import { useState } from 'react'
import { type Player, type ScoreType } from '../types'
import { Container } from './Container'
import { PlayerDetail } from './PlayerDetail'

interface ScoreboardProps {
    players: Player[]
    onReset: () => void
    onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
}

export function Scoreboard({ players, onReset, onAddScore }: ScoreboardProps) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

    return (
        <Container>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">主畫面</h2>
                <button
                    onClick={onReset}
                    className="w-full rounded-lg p-4 text-white bg-gray-600"
                >
                    重設一局
                </button>
            </div>
            <ul className="space-y-2">
                {players.map((p) => {
                    const colorClass = `btn-${p.color}`
                    return (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPlayer(p)}
                            className={`w-full rounded-lg p-4 ${colorClass}`}
                        >
                            {p.name}
                        </button>
                    )
                })}
            </ul>

            {/* 玩家詳細彈窗 */}
            {selectedPlayer && (
                <PlayerDetail
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                    onAddScore={onAddScore}
                />
            )}
        </Container>
    )
}